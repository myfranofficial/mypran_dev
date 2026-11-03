import "server-only";
import { getDb } from "./index";
import { buildFilterWhere, getNextSortOrder, moveSortOrder } from "./query-helpers";

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
  const { clause, params } = buildFilterWhere(filter.q, ["title", "subtitle", "link_url"]);
  return getDb()
    .prepare(`SELECT * FROM banners ${clause} ORDER BY sort_order ASC, id ASC`)
    .all(...params) as Banner[];
}

export function getBanner(id: number): Banner | undefined {
  return getDb().prepare("SELECT * FROM banners WHERE id = ?").get(id) as Banner | undefined;
}

export function createBanner(d: BannerInput): number {
  const db = getDb();
  const next = getNextSortOrder(db, "banners");
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
  moveSortOrder(getDb(), "banners", listBanners(), id, dir);
}
