import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Sanitize filename
  const ext = path.extname(file.name).toLowerCase();
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  const uploadDir = path.join(process.cwd(), "public/brands");
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, safeName);
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/brands/${safeName}` });
}
