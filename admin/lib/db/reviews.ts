import "server-only";
import { getDb } from "./index";

export interface Review {
  id: number;
  author: string;
  rating: number;
  content: string | null;
  source: string;
  is_active: number;
  created_at: string;
}

export interface ReviewInput {
  author: string;
  rating: number;
  content: string | null;
  source?: string;
  is_active?: number;
}

export function listReviews(filter: { q?: string; source?: string } = {}): Review[] {
  const where: string[] = [];
  const params: string[] = [];
  if (filter.q) {
    const like = `%${filter.q}%`;
    where.push("(author LIKE ? OR content LIKE ?)");
    params.push(like, like);
  }
  if (filter.source) {
    where.push("source = ?");
    params.push(filter.source);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return getDb()
    .prepare(`SELECT * FROM reviews ${clause} ORDER BY created_at DESC, id DESC`)
    .all(...params) as Review[];
}

export function listActiveReviews(): Review[] {
  return getDb()
    .prepare("SELECT * FROM reviews WHERE is_active = 1 ORDER BY created_at DESC, id DESC")
    .all() as Review[];
}

export function getReview(id: number): Review | undefined {
  return getDb().prepare("SELECT * FROM reviews WHERE id = ?").get(id) as Review | undefined;
}

export function createReview(d: ReviewInput): number {
  const info = getDb()
    .prepare("INSERT INTO reviews (author, rating, content, source, is_active) VALUES (?, ?, ?, ?, ?)")
    .run(d.author, d.rating, d.content, d.source ?? "admin", d.is_active ?? 1);
  return Number(info.lastInsertRowid);
}

export function updateReview(id: number, d: ReviewInput): void {
  getDb()
    .prepare("UPDATE reviews SET author = ?, rating = ?, content = ?, is_active = ? WHERE id = ?")
    .run(d.author, d.rating, d.content, d.is_active ?? 1, id);
}

export function setReviewActive(id: number, active: number): void {
  getDb().prepare("UPDATE reviews SET is_active = ? WHERE id = ?").run(active, id);
}

export function deleteReview(id: number): void {
  getDb().prepare("DELETE FROM reviews WHERE id = ?").run(id);
}
