import path from "node:path";

export const STORAGE_DRIVER = process.env.STORAGE_DRIVER ?? "local";

export const UPLOAD_DIR =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "data", "uploads");

export const IMAGE_BASE_URL = (process.env.IMAGE_BASE_URL ?? "/uploads").replace(
  /\/+$/,
  ""
);
