import "server-only";
import { getDb } from "./index";

export interface GalleryImage {
  id: number;
  title: string | null;
  category: string | null;
  branch: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export interface GalleryImageInput {
  title: string | null;
  category: string | null;
  branch: string | null;
  image_url: string;
}

export function listGalleryImages(filter: { q?: string; category?: string } = {}): GalleryImage[] {
  const where: string[] = [];
  const params: string[] = [];
  if (filter.q) {
    const like = `%${filter.q}%`;
    where.push("(title LIKE ? OR branch LIKE ?)");
    params.push(like, like);
  }
  if (filter.category) {
    where.push("category = ?");
    params.push(filter.category);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return getDb()
    .prepare(`SELECT * FROM gallery_images ${clause} ORDER BY sort_order ASC, id DESC`)
    .all(...params) as GalleryImage[];
}

export function getGalleryImage(id: number): GalleryImage | undefined {
  return getDb().prepare("SELECT * FROM gallery_images WHERE id = ?").get(id) as GalleryImage | undefined;
}

export function createGalleryImage(d: GalleryImageInput): number {
  const db = getDb();
  const next = (db.prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM gallery_images").get() as { next: number }).next;
  const info = db
    .prepare("INSERT INTO gallery_images (title, category, branch, image_url, sort_order) VALUES (?, ?, ?, ?, ?)")
    .run(d.title, d.category, d.branch, d.image_url, next);
  return Number(info.lastInsertRowid);
}

export function updateGalleryImage(id: number, d: GalleryImageInput): void {
  getDb()
    .prepare("UPDATE gallery_images SET title = ?, category = ?, branch = ?, image_url = ? WHERE id = ?")
    .run(d.title, d.category, d.branch, d.image_url, id);
}

export function deleteGalleryImage(id: number): void {
  getDb().prepare("DELETE FROM gallery_images WHERE id = ?").run(id);
}

export function listGalleryCategories(): string[] {
  const rows = getDb()
    .prepare("SELECT DISTINCT category FROM gallery_images WHERE category IS NOT NULL AND category <> '' ORDER BY category ASC")
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}
