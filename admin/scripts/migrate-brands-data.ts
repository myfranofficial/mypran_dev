/**
 * 기존 brands.json의 상세 데이터를 DB의 새 컬럼에 채우는 마이그레이션 스크립트.
 * brands 테이블에 이미 name으로 시딩된 44개 브랜드가 있고,
 * 새 컬럼(tier, founding_cost_min, cost_breakdown 등)이 ALTER TABLE로 추가된 상태를 가정.
 *
 * Usage:
 *   npx tsx scripts/migrate-brands-data.ts [db-path] [brands-json-path]
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dbPath = process.argv[2] || path.join(__dirname, "..", "data", "myfran.db");
const jsonPath = process.argv[3] || path.join(__dirname, "..", "..", "web", "data", "brands.json");

console.log(`DB:   ${dbPath}`);
console.log(`JSON: ${jsonPath}`);

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// 필요한 컬럼이 없으면 추가 (connect.ts의 마이그레이션과 동일)
const brandCols = db.pragma("table_info(brands)") as { name: string }[];
const brandColNames = new Set(brandCols.map((c) => c.name));
const brandMigrations: [string, string][] = [
  ["tier", "ALTER TABLE brands ADD COLUMN tier TEXT DEFAULT 'special'"],
  ["founding_cost_min", "ALTER TABLE brands ADD COLUMN founding_cost_min INTEGER DEFAULT 0"],
  ["listing_fee", "ALTER TABLE brands ADD COLUMN listing_fee INTEGER DEFAULT 0"],
  ["store_type", "ALTER TABLE brands ADD COLUMN store_type TEXT DEFAULT 'hall'"],
  ["cost_breakdown", "ALTER TABLE brands ADD COLUMN cost_breakdown TEXT"],
  ["franchise_fee", "ALTER TABLE brands ADD COLUMN franchise_fee TEXT"],
  ["education_fee", "ALTER TABLE brands ADD COLUMN education_fee TEXT"],
  ["royalty", "ALTER TABLE brands ADD COLUMN royalty TEXT"],
  ["standard_area", "ALTER TABLE brands ADD COLUMN standard_area TEXT"],
  ["vat_included", "ALTER TABLE brands ADD COLUMN vat_included INTEGER DEFAULT 0"],
  ["deposit_included", "ALTER TABLE brands ADD COLUMN deposit_included INTEGER DEFAULT 0"],
  ["startup_process", "ALTER TABLE brands ADD COLUMN startup_process TEXT"],
  ["headquarters", "ALTER TABLE brands ADD COLUMN headquarters TEXT"],
];
for (const [col, sql] of brandMigrations) {
  if (!brandColNames.has(col)) { db.exec(sql); console.log(`  ALTER TABLE brands ADD ${col}`); }
}
const catCols = db.pragma("table_info(brand_categories)") as { name: string }[];
if (!catCols.some((c) => c.name === "slug")) {
  db.exec("ALTER TABLE brand_categories ADD COLUMN slug TEXT");
  console.log("  ALTER TABLE brand_categories ADD slug");
}

const brands: any[] = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

// category slug → id 매핑 (없으면 생성)
const CATEGORY_MAP: Record<string, string> = {
  korean: "한식",
  snack: "분식",
  cafe: "카페",
  chicken: "치킨",
  meat: "고기",
  pub: "주점",
};

// 카테고리 slug 업데이트 / 생성
for (const [slug, name] of Object.entries(CATEGORY_MAP)) {
  const existing = db.prepare("SELECT id FROM brand_categories WHERE name = ?").get(name) as { id: number } | undefined;
  if (existing) {
    db.prepare("UPDATE brand_categories SET slug = ? WHERE id = ?").run(slug, existing.id);
    console.log(`  카테고리 '${name}' slug='${slug}' 업데이트`);
  } else {
    db.prepare("INSERT INTO brand_categories (name, slug, is_active) VALUES (?, ?, 1)").run(name, slug);
    console.log(`  카테고리 '${name}' slug='${slug}' 생성`);
  }
}

// category slug → id 조회
function getCategoryId(slug: string): number | null {
  const row = db.prepare("SELECT id FROM brand_categories WHERE slug = ?").get(slug) as { id: number } | undefined;
  return row?.id ?? null;
}

const updateStmt = db.prepare(`
  UPDATE brands SET
    tier = ?,
    founding_cost_min = ?,
    listing_fee = ?,
    store_type = ?,
    cost_breakdown = ?,
    franchise_fee = ?,
    education_fee = ?,
    royalty = ?,
    standard_area = ?,
    vat_included = ?,
    deposit_included = ?,
    startup_process = ?,
    headquarters = ?,
    founding_cost = ?,
    store_count = ?,
    tagline = ?,
    description = ?,
    features = ?,
    phone = ?,
    main_image_url = ?,
    is_featured = ?,
    sort_order = ?,
    category_id = ?
  WHERE name = ?
`);

const insertStmt = db.prepare(`
  INSERT INTO brands (
    name, category_id, tier, tagline, description,
    founding_cost, founding_cost_min, listing_fee, store_count, store_type,
    logo_url, main_image_url, images, features,
    cost_breakdown, franchise_fee, education_fee, royalty, standard_area,
    vat_included, deposit_included, startup_process, headquarters,
    phone, kakao_url, is_featured, is_active, sort_order
  ) VALUES (
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, 1, ?
  )
`);

function brandParams(b: any) {
  const catId = b.categoryId ? getCategoryId(b.categoryId) : null;
  return [
    b.tier || "special",
    b.foundingCostMin || 0,
    b.listingFeePerMonth || 0,
    b.storeType || "hall",
    b.costBreakdown ? JSON.stringify(b.costBreakdown) : null,
    b.franchiseFee || null,
    b.educationFee || null,
    b.royalty || null,
    b.standardArea || null,
    b.vatIncluded ? 1 : 0,
    b.depositIncluded ? 1 : 0,
    b.startupProcess ? JSON.stringify(b.startupProcess) : null,
    b.headquarters ? JSON.stringify(b.headquarters) : null,
    b.foundingCost || null,
    b.storeCount || 0,
    b.tagline || null,
    b.description || null,
    b.features ? JSON.stringify(b.features) : null,
    b.phone || null,
    b.mainImage || null,
    b.isFeatured ? 1 : 0,
    b.order || 0,
    catId,
  ];
}

let updated = 0;
let inserted = 0;

for (const b of brands) {
  const catId = b.categoryId ? getCategoryId(b.categoryId) : null;
  const result = updateStmt.run(
    ...brandParams(b),
    b.name,
  );

  if (result.changes > 0) {
    updated++;
    console.log(`  ✓ UPDATE ${b.name} (tier=${b.tier}, cat=${b.categoryId})`);
  } else {
    // INSERT
    insertStmt.run(
      b.name, catId, b.tier || "special", b.tagline || null, b.description || null,
      b.foundingCost || null, b.foundingCostMin || 0, b.listingFeePerMonth || 0, b.storeCount || 0, b.storeType || "hall",
      b.logo || null, b.mainImage || null,
      b.images ? JSON.stringify(b.images) : null,
      b.features ? JSON.stringify(b.features) : null,
      b.costBreakdown ? JSON.stringify(b.costBreakdown) : null,
      b.franchiseFee || null, b.educationFee || null, b.royalty || null, b.standardArea || null,
      b.vatIncluded ? 1 : 0, b.depositIncluded ? 1 : 0,
      b.startupProcess ? JSON.stringify(b.startupProcess) : null,
      b.headquarters ? JSON.stringify(b.headquarters) : null,
      b.phone || null, b.kakaoUrl || null,
      b.isFeatured ? 1 : 0,
      b.order || 0,
    );
    inserted++;
    console.log(`  + INSERT ${b.name} (tier=${b.tier}, cat=${b.categoryId})`);
  }
}

console.log(`\n완료: ${updated}개 업데이트, ${inserted}개 신규 삽입`);
db.close();
