import "server-only";
import { getDb } from "./index";

export interface StorePhoto {
  id: number;
  store_id: number;
  image_url: string;
  title: string | null;
  is_representative: number;
  sort_order: number;
  created_at: string;
}

export interface StorePhotoInput {
  store_id: number;
  image_url: string;
  title: string | null;
  is_representative: number;
}

export function listStorePhotos(storeId: number): StorePhoto[] {
  return getDb()
    .prepare("SELECT * FROM store_photos WHERE store_id = ? ORDER BY sort_order ASC, id ASC")
    .all(storeId) as StorePhoto[];
}

export function getStorePhoto(id: number): StorePhoto | undefined {
  return getDb().prepare("SELECT * FROM store_photos WHERE id = ?").get(id) as StorePhoto | undefined;
}

export function createStorePhoto(d: StorePhotoInput): number {
  const db = getDb();
  const next = (db.prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM store_photos WHERE store_id = ?").get(d.store_id) as { next: number }).next;

  // 대표사진 설정 시 기존 대표사진 해제
  if (d.is_representative) {
    db.prepare("UPDATE store_photos SET is_representative = 0 WHERE store_id = ?").run(d.store_id);
  }

  const info = db
    .prepare("INSERT INTO store_photos (store_id, image_url, title, is_representative, sort_order) VALUES (?, ?, ?, ?, ?)")
    .run(d.store_id, d.image_url, d.title, d.is_representative, next);
  return Number(info.lastInsertRowid);
}

export function updateStorePhoto(id: number, d: Partial<StorePhotoInput>): void {
  const db = getDb();
  const photo = getStorePhoto(id);
  if (!photo) return;

  // 대표사진 설정 시 기존 대표사진 해제
  if (d.is_representative) {
    db.prepare("UPDATE store_photos SET is_representative = 0 WHERE store_id = ?").run(photo.store_id);
  }

  const sets: string[] = [];
  const params: unknown[] = [];
  if (d.image_url !== undefined) { sets.push("image_url = ?"); params.push(d.image_url); }
  if (d.title !== undefined) { sets.push("title = ?"); params.push(d.title); }
  if (d.is_representative !== undefined) { sets.push("is_representative = ?"); params.push(d.is_representative); }
  if (sets.length === 0) return;
  params.push(id);
  db.prepare(`UPDATE store_photos SET ${sets.join(", ")} WHERE id = ?`).run(...params);
}

export function deleteStorePhoto(id: number): void {
  getDb().prepare("DELETE FROM store_photos WHERE id = ?").run(id);
}

export function reorderStorePhotos(storeId: number, photoIds: number[]): void {
  const db = getDb();
  const stmt = db.prepare("UPDATE store_photos SET sort_order = ? WHERE id = ? AND store_id = ?");
  for (let i = 0; i < photoIds.length; i++) {
    stmt.run(i, photoIds[i], storeId);
  }
}

export function setRepresentative(storeId: number, photoId: number): void {
  const db = getDb();
  db.prepare("UPDATE store_photos SET is_representative = 0 WHERE store_id = ?").run(storeId);
  db.prepare("UPDATE store_photos SET is_representative = 1 WHERE id = ? AND store_id = ?").run(photoId, storeId);
}
