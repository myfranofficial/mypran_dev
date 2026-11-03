import "server-only";
import { getDb } from "./index";
import { buildFilterWhere, getNextSortOrder, moveSortOrder } from "./query-helpers";

export interface Popup {
  id: number;
  title: string;
  image_url: string;
  link_url: string | null;
  link_text: string | null;
  position: string;
  start_at: string | null;
  end_at: string | null;
  sort_order: number;
  is_active: number;
  created_at: string;
}

export interface PopupInput {
  title: string;
  image_url: string;
  link_url: string | null;
  link_text: string | null;
  position: string;
  start_at: string | null;
  end_at: string | null;
  is_active: number;
}

export interface PopupFilter {
  q?: string;
}

export function listPopups(filter: PopupFilter = {}): Popup[] {
  const { clause, params } = buildFilterWhere(filter.q, ["title", "link_url"]);
  return getDb()
    .prepare(`SELECT * FROM popups ${clause} ORDER BY sort_order ASC, id ASC`)
    .all(...params) as Popup[];
}

export function getPopup(id: number): Popup | undefined {
  return getDb().prepare("SELECT * FROM popups WHERE id = ?").get(id) as Popup | undefined;
}

export function createPopup(d: PopupInput): number {
  const db = getDb();
  const next = getNextSortOrder(db, "popups");
  const info = db
    .prepare(
      "INSERT INTO popups (title, image_url, link_url, link_text, position, start_at, end_at, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      d.title,
      d.image_url,
      d.link_url,
      d.link_text,
      d.position,
      d.start_at,
      d.end_at,
      next,
      d.is_active
    );
  return Number(info.lastInsertRowid);
}

export function updatePopup(id: number, d: PopupInput): void {
  getDb()
    .prepare(
      "UPDATE popups SET title = ?, image_url = ?, link_url = ?, link_text = ?, position = ?, start_at = ?, end_at = ?, is_active = ? WHERE id = ?"
    )
    .run(
      d.title,
      d.image_url,
      d.link_url,
      d.link_text,
      d.position,
      d.start_at,
      d.end_at,
      d.is_active,
      id
    );
}

export function setPopupActive(id: number, active: number): void {
  getDb().prepare("UPDATE popups SET is_active = ? WHERE id = ?").run(active, id);
}

export function deletePopup(id: number): void {
  getDb().prepare("DELETE FROM popups WHERE id = ?").run(id);
}

export function movePopup(id: number, dir: "up" | "down"): void {
  moveSortOrder(getDb(), "popups", listPopups(), id, dir);
}
