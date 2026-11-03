import "server-only";
import { getDb } from "./index";
import { buildFilterWhere, getNextSortOrder } from "./query-helpers";

export interface Store {
  id: number;
  name: string;
  address: string | null;
  size: string | null;
  tables_count: number | null;
  phone: string | null;
  hours: string | null;
  features: string | null;
  image_url: string | null;
  is_new: number;
  sort_order: number;
  is_active: number;
  created_at: string;
}

export interface StoreInput {
  name: string;
  address: string | null;
  size: string | null;
  tables_count: number | null;
  phone: string | null;
  hours: string | null;
  features: string | null;
  image_url: string | null;
  is_new: number;
  is_active: number;
}

export function listStores(filter: { q?: string } = {}): Store[] {
  const { clause, params } = buildFilterWhere(filter.q, ["name", "address"]);
  return getDb()
    .prepare(`SELECT * FROM stores ${clause} ORDER BY sort_order ASC, id ASC`)
    .all(...params) as Store[];
}

export function getStore(id: number): Store | undefined {
  return getDb().prepare("SELECT * FROM stores WHERE id = ?").get(id) as Store | undefined;
}

export function createStore(d: StoreInput): number {
  const db = getDb();
  const next = getNextSortOrder(db, "stores");
  const info = db
    .prepare("INSERT INTO stores (name, address, size, tables_count, phone, hours, features, image_url, is_new, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .run(d.name, d.address, d.size, d.tables_count, d.phone, d.hours, d.features, d.image_url, d.is_new, d.is_active, next);
  return Number(info.lastInsertRowid);
}

export function updateStore(id: number, d: StoreInput): void {
  getDb()
    .prepare("UPDATE stores SET name = ?, address = ?, size = ?, tables_count = ?, phone = ?, hours = ?, features = ?, image_url = ?, is_new = ?, is_active = ? WHERE id = ?")
    .run(d.name, d.address, d.size, d.tables_count, d.phone, d.hours, d.features, d.image_url, d.is_new, d.is_active, id);
}

export function deleteStore(id: number): void {
  getDb().prepare("DELETE FROM stores WHERE id = ?").run(id);
}
