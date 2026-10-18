import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { UPLOAD_DIR, IMAGE_BASE_URL } from "./config";

const ABSOLUTE_URL = /^https?:\/\//i;

export function isLocalKey(value: string | null | undefined): value is string {
  return !!value && !ABSOLUTE_URL.test(value);
}

export function imageUrl(key: string): string {
  if (ABSOLUTE_URL.test(key)) return key;
  return `${IMAGE_BASE_URL}/${key.replace(/^\/+/, "")}`;
}

export async function saveImage(buffer: Buffer, ext: string): Promise<string> {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const name = `${randomBytes(12).toString("hex")}.${ext.replace(/^\./, "")}`;
  const key = `${yyyy}/${mm}/${name}`;

  const dest = path.join(UPLOAD_DIR, key);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buffer);
  return key;
}

export async function saveFile(buffer: Buffer, originalName: string): Promise<string> {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const ext = path.extname(originalName).replace(/^\./, "") || "bin";
  const name = `${randomBytes(12).toString("hex")}.${ext}`;
  const key = `${yyyy}/${mm}/${name}`;

  const dest = path.join(UPLOAD_DIR, key);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buffer);
  return key;
}

export async function deleteImage(key: string | null | undefined): Promise<void> {
  if (!isLocalKey(key)) return;
  const target = path.join(UPLOAD_DIR, key);
  const resolved = path.resolve(target);
  if (!resolved.startsWith(path.resolve(UPLOAD_DIR))) return;
  try {
    await fs.unlink(resolved);
  } catch {
    // already gone or inaccessible
  }
}

export async function deleteImages(
  keys: (string | null | undefined)[]
): Promise<void> {
  await Promise.all(keys.map((k) => deleteImage(k)));
}
