import "server-only";
import { getDb } from "./index";

export interface Consultation {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  message: string | null;
  is_read: number;
  is_handled: number;
  created_at: string;
}

export interface ConsultationInput {
  name: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  message: string | null;
}

export function listConsultations(filter: { q?: string; status?: string } = {}): Consultation[] {
  const where: string[] = [];
  const params: string[] = [];
  if (filter.q) {
    const like = `%${filter.q}%`;
    where.push("(name LIKE ? OR phone LIKE ? OR message LIKE ?)");
    params.push(like, like, like);
  }
  if (filter.status === "unread") {
    where.push("is_read = 0");
  } else if (filter.status === "read") {
    where.push("is_read = 1 AND is_handled = 0");
  } else if (filter.status === "handled") {
    where.push("is_handled = 1");
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return getDb()
    .prepare(`SELECT * FROM consultations ${clause} ORDER BY created_at DESC, id DESC`)
    .all(...params) as Consultation[];
}

export function getConsultation(id: number): Consultation | undefined {
  return getDb().prepare("SELECT * FROM consultations WHERE id = ?").get(id) as Consultation | undefined;
}

export function createConsultation(d: ConsultationInput): number {
  const info = getDb()
    .prepare("INSERT INTO consultations (name, phone, email, location, message) VALUES (?, ?, ?, ?, ?)")
    .run(d.name, d.phone, d.email, d.location, d.message);
  return Number(info.lastInsertRowid);
}

export function markRead(id: number): void {
  getDb().prepare("UPDATE consultations SET is_read = 1 WHERE id = ?").run(id);
}

export function markHandled(id: number): void {
  getDb().prepare("UPDATE consultations SET is_handled = 1, is_read = 1 WHERE id = ?").run(id);
}

export function deleteConsultation(id: number): void {
  getDb().prepare("DELETE FROM consultations WHERE id = ?").run(id);
}

export function countUnread(): number {
  const row = getDb().prepare("SELECT COUNT(*) AS cnt FROM consultations WHERE is_read = 0").get() as { cnt: number };
  return row.cnt;
}
