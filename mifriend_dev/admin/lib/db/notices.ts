import "server-only";
import { getDb } from "./index";

export interface Notice {
  id: number;
  category: string | null;
  title: string;
  content: string | null;
  date: string | null;
  is_pinned: number;
  is_active: number;
  created_at: string;
}

export interface NoticeInput {
  category: string | null;
  title: string;
  content: string | null;
  date: string | null;
  is_pinned: number;
  is_active: number;
}

export interface NoticeFilter {
  q?: string;
  category?: string;
}

export function listNotices(filter: NoticeFilter = {}): Notice[] {
  const where: string[] = [];
  const params: string[] = [];
  if (filter.q) {
    const like = `%${filter.q}%`;
    where.push("(title LIKE ? OR content LIKE ? OR category LIKE ?)");
    params.push(like, like, like);
  }
  if (filter.category) {
    where.push("category = ?");
    params.push(filter.category);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return getDb()
    .prepare(
      `SELECT * FROM notices ${clause} ORDER BY is_pinned DESC, created_at DESC, id DESC`
    )
    .all(...params) as Notice[];
}

export function listNoticeCategories(): string[] {
  const rows = getDb()
    .prepare(
      "SELECT DISTINCT category FROM notices WHERE category IS NOT NULL AND category <> '' ORDER BY category ASC"
    )
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}

export function getNotice(id: number): Notice | undefined {
  return getDb().prepare("SELECT * FROM notices WHERE id = ?").get(id) as Notice | undefined;
}

export function createNotice(d: NoticeInput): number {
  const info = getDb()
    .prepare(
      "INSERT INTO notices (category, title, content, date, is_pinned, is_active) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(d.category, d.title, d.content, d.date, d.is_pinned, d.is_active);
  return Number(info.lastInsertRowid);
}

export function updateNotice(id: number, d: NoticeInput): void {
  getDb()
    .prepare(
      "UPDATE notices SET category = ?, title = ?, content = ?, date = ?, is_pinned = ?, is_active = ? WHERE id = ?"
    )
    .run(d.category, d.title, d.content, d.date, d.is_pinned, d.is_active, id);
}

export function setNoticeActive(id: number, active: number): void {
  getDb().prepare("UPDATE notices SET is_active = ? WHERE id = ?").run(active, id);
}

export function setNoticePinned(id: number, pinned: number): void {
  getDb().prepare("UPDATE notices SET is_pinned = ? WHERE id = ?").run(pinned, id);
}

export function deleteNotice(id: number): void {
  getDb().prepare("DELETE FROM notices WHERE id = ?").run(id);
}
