import "server-only";
import { getDb } from "./index";
import { buildFilterWhere, getNextSortOrder } from "./query-helpers";

export interface Video {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  youtube_id: string | null;
  date: string | null;
  sort_order: number;
  created_at: string;
}

export interface VideoInput {
  title: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  youtube_id: string | null;
  date: string | null;
}

export function listVideos(filter: { q?: string; category?: string } = {}): Video[] {
  const { clause, params } = buildFilterWhere(filter.q, ["title", "description"], [{ column: "category", value: filter.category }]);
  return getDb()
    .prepare(`SELECT * FROM videos ${clause} ORDER BY sort_order ASC, id DESC`)
    .all(...params) as Video[];
}

export function getVideo(id: number): Video | undefined {
  return getDb().prepare("SELECT * FROM videos WHERE id = ?").get(id) as Video | undefined;
}

export function createVideo(d: VideoInput): number {
  const db = getDb();
  const next = getNextSortOrder(db, "videos");
  const info = db
    .prepare("INSERT INTO videos (title, description, category, thumbnail_url, youtube_id, date, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(d.title, d.description, d.category, d.thumbnail_url, d.youtube_id, d.date, next);
  return Number(info.lastInsertRowid);
}

export function updateVideo(id: number, d: VideoInput): void {
  getDb()
    .prepare("UPDATE videos SET title = ?, description = ?, category = ?, thumbnail_url = ?, youtube_id = ?, date = ? WHERE id = ?")
    .run(d.title, d.description, d.category, d.thumbnail_url, d.youtube_id, d.date, id);
}

export function deleteVideo(id: number): void {
  getDb().prepare("DELETE FROM videos WHERE id = ?").run(id);
}

export function listVideoCategories(): string[] {
  const rows = getDb()
    .prepare("SELECT DISTINCT category FROM videos WHERE category IS NOT NULL AND category <> '' ORDER BY category ASC")
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}
