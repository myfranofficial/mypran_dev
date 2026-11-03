import "server-only";
import { getDb } from "./index";
import { buildFilterWhere } from "./query-helpers";

export interface Event {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  is_active: number;
  created_at: string;
}

export interface EventInput {
  title: string;
  description: string | null;
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  is_active: number;
}

export function listEvents(filter: { q?: string; status?: string } = {}): Event[] {
  const { clause, params } = buildFilterWhere(filter.q, ["title", "description"], [{ column: "status", value: filter.status }]);
  return getDb()
    .prepare(`SELECT * FROM events ${clause} ORDER BY created_at DESC, id DESC`)
    .all(...params) as Event[];
}

export function getEvent(id: number): Event | undefined {
  return getDb().prepare("SELECT * FROM events WHERE id = ?").get(id) as Event | undefined;
}

export function createEvent(d: EventInput): number {
  const info = getDb()
    .prepare("INSERT INTO events (title, description, image_url, start_date, end_date, status, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(d.title, d.description, d.image_url, d.start_date, d.end_date, d.status, d.is_active);
  return Number(info.lastInsertRowid);
}

export function updateEvent(id: number, d: EventInput): void {
  getDb()
    .prepare("UPDATE events SET title = ?, description = ?, image_url = ?, start_date = ?, end_date = ?, status = ?, is_active = ? WHERE id = ?")
    .run(d.title, d.description, d.image_url, d.start_date, d.end_date, d.status, d.is_active, id);
}

export function setEventActive(id: number, active: number): void {
  getDb().prepare("UPDATE events SET is_active = ? WHERE id = ?").run(active, id);
}

export function deleteEvent(id: number): void {
  getDb().prepare("DELETE FROM events WHERE id = ?").run(id);
}
