import "server-only";
import { getDb } from "./index";
import { buildFilterWhere } from "./query-helpers";

export interface Download {
  id: number;
  title: string;
  description: string | null;
  filename: string | null;
  file_url: string | null;
  file_size: string | null;
  download_count: number;
  created_at: string;
}

export interface DownloadInput {
  title: string;
  description: string | null;
  filename: string | null;
  file_url: string | null;
  file_size: string | null;
}

export function listDownloads(filter: { q?: string } = {}): Download[] {
  const { clause, params } = buildFilterWhere(filter.q, ["title", "description", "filename"]);
  return getDb()
    .prepare(`SELECT * FROM downloads ${clause} ORDER BY created_at DESC, id DESC`)
    .all(...params) as Download[];
}

export function getDownload(id: number): Download | undefined {
  return getDb().prepare("SELECT * FROM downloads WHERE id = ?").get(id) as Download | undefined;
}

export function createDownload(d: DownloadInput): number {
  const info = getDb()
    .prepare("INSERT INTO downloads (title, description, filename, file_url, file_size) VALUES (?, ?, ?, ?, ?)")
    .run(d.title, d.description, d.filename, d.file_url, d.file_size);
  return Number(info.lastInsertRowid);
}

export function updateDownload(id: number, d: DownloadInput): void {
  getDb()
    .prepare("UPDATE downloads SET title = ?, description = ?, filename = ?, file_url = ?, file_size = ? WHERE id = ?")
    .run(d.title, d.description, d.filename, d.file_url, d.file_size, id);
}

export function deleteDownload(id: number): void {
  getDb().prepare("DELETE FROM downloads WHERE id = ?").run(id);
}
