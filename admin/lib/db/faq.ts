import "server-only";
import { getDb } from "./index";
import { buildFilterWhere, getNextSortOrder } from "./query-helpers";

export interface FaqItem {
  id: number;
  category: string | null;
  question: string;
  answer: string | null;
  sort_order: number;
  created_at: string;
}

export interface FaqItemInput {
  category: string | null;
  question: string;
  answer: string | null;
}

export function listFaqItems(filter: { q?: string; category?: string } = {}): FaqItem[] {
  const { clause, params } = buildFilterWhere(filter.q, ["question", "answer"], [{ column: "category", value: filter.category }]);
  return getDb()
    .prepare(`SELECT * FROM faq_items ${clause} ORDER BY sort_order ASC, id ASC`)
    .all(...params) as FaqItem[];
}

export function getFaqItem(id: number): FaqItem | undefined {
  return getDb().prepare("SELECT * FROM faq_items WHERE id = ?").get(id) as FaqItem | undefined;
}

export function createFaqItem(d: FaqItemInput): number {
  const db = getDb();
  const next = getNextSortOrder(db, "faq_items");
  const info = db
    .prepare("INSERT INTO faq_items (category, question, answer, sort_order) VALUES (?, ?, ?, ?)")
    .run(d.category, d.question, d.answer, next);
  return Number(info.lastInsertRowid);
}

export function updateFaqItem(id: number, d: FaqItemInput): void {
  getDb()
    .prepare("UPDATE faq_items SET category = ?, question = ?, answer = ? WHERE id = ?")
    .run(d.category, d.question, d.answer, id);
}

export function deleteFaqItem(id: number): void {
  getDb().prepare("DELETE FROM faq_items WHERE id = ?").run(id);
}

export function listFaqCategories(): string[] {
  const rows = getDb()
    .prepare("SELECT DISTINCT category FROM faq_items WHERE category IS NOT NULL AND category <> '' ORDER BY category ASC")
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}
