import "server-only";
import { getDb } from "./index";

export interface BrandCategory {
  id: number;
  name: string;
  sort_order: number;
  is_active: number;
}

export interface Brand {
  id: number;
  category_id: number | null;
  name: string;
  tier: string;
  tagline: string | null;
  description: string | null;
  founding_cost: string | null;
  founding_cost_min: number;
  listing_fee: number;
  store_count: number;
  store_type: string | null;
  logo_url: string | null;
  main_image_url: string | null;
  images: string | null;
  features: string | null;
  cost_breakdown: string | null;
  franchise_fee: string | null;
  education_fee: string | null;
  royalty: string | null;
  standard_area: string | null;
  vat_included: number;
  deposit_included: number;
  startup_process: string | null;
  headquarters: string | null;
  phone: string | null;
  kakao_url: string | null;
  is_featured: number;
  is_active: number;
  sort_order: number;
  created_at: string;
  // join
  category_name?: string | null;
  category_slug?: string | null;
}

export interface BrandInput {
  category_id: number | null;
  name: string;
  tier: string;
  tagline: string | null;
  description: string | null;
  founding_cost: string | null;
  founding_cost_min: number;
  listing_fee: number;
  store_count: number;
  store_type: string;
  logo_url: string | null;
  main_image_url: string | null;
  images: string | null;
  features: string | null;
  cost_breakdown: string | null;
  franchise_fee: string | null;
  education_fee: string | null;
  royalty: string | null;
  standard_area: string | null;
  vat_included: number;
  deposit_included: number;
  startup_process: string | null;
  headquarters: string | null;
  phone: string | null;
  kakao_url: string | null;
  is_featured: number;
  is_active: number;
}

// ── 카테고리 ──

export function listCategories(): BrandCategory[] {
  return getDb()
    .prepare("SELECT * FROM brand_categories ORDER BY sort_order ASC, id ASC")
    .all() as BrandCategory[];
}

export function listActiveCategories(): BrandCategory[] {
  return getDb()
    .prepare("SELECT * FROM brand_categories WHERE is_active = 1 ORDER BY sort_order ASC, id ASC")
    .all() as BrandCategory[];
}

export function getCategory(id: number): BrandCategory | undefined {
  return getDb().prepare("SELECT * FROM brand_categories WHERE id = ?").get(id) as BrandCategory | undefined;
}

export function createCategory(name: string, slug?: string): number {
  const db = getDb();
  const next = (db.prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM brand_categories").get() as { next: number }).next;
  const info = db.prepare("INSERT INTO brand_categories (name, slug, sort_order) VALUES (?, ?, ?)").run(name, slug ?? null, next);
  return Number(info.lastInsertRowid);
}

export function updateCategory(id: number, name: string, is_active: number): void {
  getDb().prepare("UPDATE brand_categories SET name = ?, is_active = ? WHERE id = ?").run(name, is_active, id);
}

export function deleteCategory(id: number): void {
  getDb().prepare("DELETE FROM brand_categories WHERE id = ?").run(id);
}

// ── 브랜드 ──

export function listBrands(filter: { q?: string; category_id?: number } = {}): Brand[] {
  const where: string[] = [];
  const params: (string | number)[] = [];

  if (filter.q) {
    const like = `%${filter.q}%`;
    where.push("(b.name LIKE ? OR b.tagline LIKE ?)");
    params.push(like, like);
  }
  if (filter.category_id) {
    where.push("b.category_id = ?");
    params.push(filter.category_id);
  }

  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return getDb()
    .prepare(
      `SELECT b.*, c.name AS category_name
       FROM brands b
       LEFT JOIN brand_categories c ON b.category_id = c.id
       ${clause}
       ORDER BY b.sort_order ASC, b.id ASC`
    )
    .all(...params) as Brand[];
}

export function getBrand(id: number): Brand | undefined {
  return getDb()
    .prepare(
      `SELECT b.*, c.name AS category_name
       FROM brands b
       LEFT JOIN brand_categories c ON b.category_id = c.id
       WHERE b.id = ?`
    )
    .get(id) as Brand | undefined;
}

export function createBrand(d: BrandInput): number {
  const db = getDb();
  const next = (db.prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM brands").get() as { next: number }).next;
  const info = db
    .prepare(
      `INSERT INTO brands
        (category_id, name, tier, tagline, description, founding_cost,
         founding_cost_min, listing_fee, store_count, store_type,
         logo_url, main_image_url, images, features,
         cost_breakdown, franchise_fee, education_fee, royalty, standard_area,
         vat_included, deposit_included, startup_process, headquarters,
         phone, kakao_url, is_featured, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      d.category_id, d.name, d.tier, d.tagline, d.description, d.founding_cost,
      d.founding_cost_min, d.listing_fee, d.store_count, d.store_type,
      d.logo_url, d.main_image_url, d.images, d.features,
      d.cost_breakdown, d.franchise_fee, d.education_fee, d.royalty, d.standard_area,
      d.vat_included, d.deposit_included, d.startup_process, d.headquarters,
      d.phone, d.kakao_url, d.is_featured, d.is_active, next
    );
  return Number(info.lastInsertRowid);
}

export function updateBrand(id: number, d: BrandInput): void {
  getDb()
    .prepare(
      `UPDATE brands SET
        category_id = ?, name = ?, tier = ?, tagline = ?, description = ?,
        founding_cost = ?, founding_cost_min = ?, listing_fee = ?,
        store_count = ?, store_type = ?,
        logo_url = ?, main_image_url = ?, images = ?, features = ?,
        cost_breakdown = ?, franchise_fee = ?, education_fee = ?,
        royalty = ?, standard_area = ?,
        vat_included = ?, deposit_included = ?,
        startup_process = ?, headquarters = ?,
        phone = ?, kakao_url = ?, is_featured = ?, is_active = ?
       WHERE id = ?`
    )
    .run(
      d.category_id, d.name, d.tier, d.tagline, d.description,
      d.founding_cost, d.founding_cost_min, d.listing_fee,
      d.store_count, d.store_type,
      d.logo_url, d.main_image_url, d.images, d.features,
      d.cost_breakdown, d.franchise_fee, d.education_fee,
      d.royalty, d.standard_area,
      d.vat_included, d.deposit_included,
      d.startup_process, d.headquarters,
      d.phone, d.kakao_url, d.is_featured, d.is_active, id
    );
}

export function deleteBrand(id: number): void {
  getDb().prepare("DELETE FROM brands WHERE id = ?").run(id);
}
