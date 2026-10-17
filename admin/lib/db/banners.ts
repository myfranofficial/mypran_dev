import "server-only";
import { getDb } from "./index";

export interface Banner {
  id: number;
  image_url: string;
  image_url_mobile: string | null;
  link_url: string | null;
  title: string | null;
  subtitle: string | null;
  start_at: string | null;
  end_at: string | null;
  sort_order: number;
  is_active: number;
}

export interface BannerInput {
  image_url: string;
  image_url_mobile: string | null;
  link_url: string | null;
  title: string | null;
  subtitle: string | null;
  start_at: string | null;
  end_at: string | null;
  is_active: number;
}

export interface BannerFilter {
  q?: string;
}

export function listBanners(filter: BannerFilter = {}): Banner[] {
  const where: string[] = [];
  const params: string[] = [];
  if (filter.q) {
    const like = `%${filter.q}%`;
    where.push("(title LIKE ? OR subtitle LIKE ? OR link_url LIKE ?)");
    params.push(like, like, like);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return getDb()
    .prepare(`SELECT * FROM banners ${clause} ORDER BY sort_order ASC, id ASC`)
    .all(...params) as Banner[];
}

export function getBanner(id: number): Banner | undefined {
  return getDb().prepare("SELECT * FROM banners WHERE id = ?").get(id) as Banner | undefined;
}

export function createBanner(d: BannerInput): number {
  const db = getDb();
  const next = (
    db.prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM banners").get() as {
      next: number;
    }
  ).next;
  const info = db
    .prepare(
      "INSERT INTO banners (image_url, image_url_mobile, link_url, title, subtitle, start_at, end_at, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      d.image_url,
      d.image_url_mobile,
      d.link_url,
      d.title,
      d.subtitle,
      d.start_at,
      d.end_at,
      next,
      d.is_active
    );
  return Number(info.lastInsertRowid);
}

export function updateBanner(id: number, d: BannerInput): void {
  getDb()
    .prepare(
      "UPDATE banners SET image_url = ?, image_url_mobile = ?, link_url = ?, title = ?, subtitle = ?, start_at = ?, end_at = ?, is_active = ? WHERE id = ?"
    )
    .run(
      d.image_url,
      d.image_url_mobile,
      d.link_url,
      d.title,
      d.subtitle,
      d.start_at,
      d.end_at,
      d.is_active,
      id
    );
}

export function setBannerActive(id: number, active: number): void {
  getDb().prepare("UPDATE banners SET is_active = ? WHERE id = ?").run(active, id);
}

export function deleteBanner(id: number): void {
  getDb().prepare("DELETE FROM banners WHERE id = ?").run(id);
}

export function moveBanner(id: number, dir: "up" | "down"): void {
  const db = getDb();
  const rows = listBanners();
  const idx = rows.findIndex((r) => r.id === id);
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapIdx < 0 || swapIdx >= rows.length) return;
  const a = rows[idx];
  const b = rows[swapIdx];
  const tx = db.transaction(() => {
    const stmt = db.prepare("UPDATE banners SET sort_order = ? WHERE id = ?");
    stmt.run(b.sort_order === a.sort_order ? a.sort_order + (dir === "up" ? -1 : 1) : b.sort_order, a.id);
    stmt.run(a.sort_order, b.id);
  });
  tx();
}
