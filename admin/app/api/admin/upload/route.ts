import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";
import { getCurrentUser, canWrite } from "@/lib/auth/user";
import { saveImage, saveFile, imageUrl } from "@/lib/storage";

export const runtime = "nodejs";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const DOC_EXTENSIONS = ["pdf", "zip", "docx", "doc", "hwp", "xlsx", "xls", "pptx", "ppt", "txt", "csv"];
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const MAX_FILE_BYTES = 50 * 1024 * 1024;
const DEFAULT_MAX_WIDTH = 1200;

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot >= 0 ? filename.slice(dot + 1).toLowerCase() : "";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !canWrite(user)) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  const isImage = IMAGE_TYPES.includes(file.type);
  const ext = getExtension(file.name);
  const isDoc = DOC_EXTENSIONS.includes(ext);

  if (!isImage && !isDoc) {
    return NextResponse.json(
      { error: `지원하지 않는 파일 형식입니다. (이미지: jpg/png/webp/gif/svg, 문서: ${DOC_EXTENSIONS.join("/")})` },
      { status: 400 }
    );
  }

  const input = Buffer.from(await file.arrayBuffer());
  const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_FILE_BYTES;
  if (input.length > maxBytes) {
    return NextResponse.json(
      { error: `파일이 너무 큽니다(최대 ${isImage ? "15MB" : "50MB"}).` },
      { status: 400 }
    );
  }

  // 문서 파일: Sharp 변환 없이 원본 저장
  if (isDoc) {
    try {
      const key = await saveFile(input, file.name);
      return NextResponse.json({
        key,
        url: imageUrl(key),
        filename: file.name,
        fileSize: formatFileSize(input.length),
      });
    } catch {
      return NextResponse.json({ error: "파일 저장에 실패했습니다." }, { status: 500 });
    }
  }

  // SVG는 변환 없이 그대로 저장
  if (file.type === "image/svg+xml") {
    try {
      const key = await saveImage(input, "svg");
      return NextResponse.json({ key, url: imageUrl(key) });
    } catch {
      return NextResponse.json({ error: "파일 저장에 실패했습니다." }, { status: 500 });
    }
  }

  const maxWidth = Number(form.get("maxWidth")) || DEFAULT_MAX_WIDTH;

  try {
    const output = await sharp(input)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    const key = await saveImage(output, "webp");
    return NextResponse.json({ key, url: imageUrl(key) });
  } catch {
    return NextResponse.json({ error: "이미지 처리에 실패했습니다." }, { status: 500 });
  }
}
