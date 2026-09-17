import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";
import { getCurrentUser, canWrite } from "@/lib/auth/user";
import { saveImage, imageUrl } from "@/lib/storage";

export const runtime = "nodejs";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_BYTES = 15 * 1024 * 1024;
const DEFAULT_MAX_WIDTH = 1200;

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
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "이미지 파일(jpg/png/webp/gif/svg)만 업로드할 수 있습니다." },
      { status: 400 }
    );
  }

  const input = Buffer.from(await file.arrayBuffer());
  if (input.length > MAX_BYTES) {
    return NextResponse.json({ error: "파일이 너무 큽니다(최대 15MB)." }, { status: 400 });
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
