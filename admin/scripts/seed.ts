/**
 * Seed script: 기존 JSON 데이터 → SQLite DB 초기 import
 *
 * Usage (from admin/ directory):
 *   npx tsx scripts/seed.ts
 *
 * 주의: 기존 데이터가 있으면 중복 삽입됩니다. 빈 DB에서 실행하세요.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Database from "better-sqlite3";

const DATA_DIR = path.join(__dirname, "..", "..", "src", "static", "data");
const DB_DIR = path.join(__dirname, "..", "data");
const DB_PATH = path.join(DB_DIR, "myfran.db");

// Ensure data dir exists
fs.mkdirSync(DB_DIR, { recursive: true });

// Read schema
const schemaPath = path.join(__dirname, "..", "lib", "db", "schema.ts");
const schemaSource = fs.readFileSync(schemaPath, "utf-8");

// Extract SQL from the schema file (between backticks of CREATE_TABLES)
const match = schemaSource.match(/export const SCHEMA_SQL = \/\* sql \*\/ `([\s\S]*?)`;/);
if (!match) {
  console.error("Could not extract SCHEMA_SQL from schema.ts");
  process.exit(1);
}
const createSql = match[1];

// Open DB
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.exec(createSql);

function readJson(filename: string): any {
  const p = path.join(DATA_DIR, filename);
  if (!fs.existsSync(p)) {
    console.warn(`  ⚠ ${filename} not found, skipping`);
    return null;
  }
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

// ── Stores ──
console.log("Seeding stores...");
const storesData = readJson("stores.json");
if (storesData) {
  // Save hero/intro as page_content
  if (storesData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("stores", "hero", JSON.stringify(storesData.hero));
  }
  if (storesData.intro) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("stores", "intro", JSON.stringify(storesData.intro));
  }

  const insertStore = db.prepare(
    "INSERT INTO stores (name, address, size, tables_count, phone, hours, features, image_url, is_new, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)"
  );
  for (let i = 0; i < (storesData.stores || []).length; i++) {
    const s = storesData.stores[i];
    insertStore.run(
      s.name || "",
      s.address || null,
      s.size || null,
      s.tables ? parseInt(String(s.tables).replace(/[^0-9]/g, "")) || null : null,
      s.phone || null,
      s.hours || null,
      Array.isArray(s.features) ? s.features.join(", ") : s.features || null,
      s.image || null,
      s.isNew ? 1 : 0,
      i
    );
  }
  console.log(`  ✓ ${(storesData.stores || []).length} stores`);
}

// ── News (notices) ──
console.log("Seeding notices...");
const newsData = readJson("news.json");
if (newsData) {
  if (newsData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("news", "hero", JSON.stringify(newsData.hero));
  }

  const insertNotice = db.prepare(
    "INSERT INTO notices (category, title, content, date, is_pinned, is_active) VALUES (?, ?, ?, ?, ?, 1)"
  );
  for (const n of newsData.notices || []) {
    insertNotice.run(
      n.category || null,
      n.title || "",
      n.content || null,
      n.date || null,
      n.isPinned ? 1 : 0
    );
  }
  console.log(`  ✓ ${(newsData.notices || []).length} notices`);
}

// ── Gallery ──
console.log("Seeding gallery...");
const galleryData = readJson("gallery.json");
if (galleryData) {
  if (galleryData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("gallery", "hero", JSON.stringify(galleryData.hero));
  }

  const insertImage = db.prepare(
    "INSERT INTO gallery_images (title, category, branch, image_url, sort_order) VALUES (?, ?, ?, ?, ?)"
  );
  for (let i = 0; i < (galleryData.images || []).length; i++) {
    const img = galleryData.images[i];
    insertImage.run(
      img.title || null,
      img.category || null,
      img.branch || null,
      img.src || null,
      i
    );
  }
  console.log(`  ✓ ${(galleryData.images || []).length} gallery images`);
}

// ── Videos ──
console.log("Seeding videos...");
const videosData = readJson("videos.json");
if (videosData) {
  if (videosData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("videos", "hero", JSON.stringify(videosData.hero));
  }

  const insertVideo = db.prepare(
    "INSERT INTO videos (title, description, category, thumbnail_url, youtube_id, date, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (let i = 0; i < (videosData.videos || []).length; i++) {
    const v = videosData.videos[i];
    insertVideo.run(
      v.title || "",
      v.desc || null,
      v.category || null,
      v.thumbnail || null,
      v.youtubeId || null,
      v.date || null,
      i
    );
  }
  console.log(`  ✓ ${(videosData.videos || []).length} videos`);
}

// ── Events ──
console.log("Seeding events...");
const eventsData = readJson("events.json");
if (eventsData) {
  if (eventsData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("events", "hero", JSON.stringify(eventsData.hero));
  }

  const STATUS_MAP: Record<string, string> = {
    "진행중": "active",
    "예정": "upcoming",
    "종료": "ended",
  };

  const insertEvent = db.prepare(
    "INSERT INTO events (title, description, image_url, start_date, end_date, status, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)"
  );
  for (const ev of eventsData.events || []) {
    insertEvent.run(
      ev.title || "",
      ev.desc || null,
      ev.image || null,
      ev.startDate || null,
      ev.endDate || null,
      STATUS_MAP[ev.status] || ev.status || "active"
    );
  }
  console.log(`  ✓ ${(eventsData.events || []).length} events`);
}

// ── FAQ ──
console.log("Seeding FAQ...");
const faqData = readJson("faq.json");
if (faqData) {
  if (faqData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("faq", "hero", JSON.stringify(faqData.hero));
  }

  const insertFaq = db.prepare(
    "INSERT INTO faq_items (category, question, answer, sort_order) VALUES (?, ?, ?, ?)"
  );
  for (let i = 0; i < (faqData.items || []).length; i++) {
    const f = faqData.items[i];
    insertFaq.run(
      f.category || null,
      f.question || "",
      f.answer || null,
      i
    );
  }
  console.log(`  ✓ ${(faqData.items || []).length} FAQ items`);
}

// ── Downloads ──
console.log("Seeding downloads...");
const downloadsData = readJson("downloads.json");
if (downloadsData) {
  if (downloadsData.hero) {
    db.prepare(
      "INSERT OR REPLACE INTO page_content (page_slug, section, content_json) VALUES (?, ?, ?)"
    ).run("downloads", "hero", JSON.stringify(downloadsData.hero));
  }

  const insertDownload = db.prepare(
    "INSERT INTO downloads (title, description, filename, file_url, file_size) VALUES (?, ?, ?, ?, ?)"
  );
  for (const f of downloadsData.files || []) {
    insertDownload.run(
      f.title || "",
      f.desc || null,
      f.filename || null,
      f.filename ? `/uploads/${f.filename}` : null,
      f.size || null
    );
  }
  console.log(`  ✓ ${(downloadsData.files || []).length} downloads`);
}

// ── Default settings ──
console.log("Seeding default settings...");
const defaults: Record<string, string> = {
  phone: "010-4708-6091",
  email: "myfriend2026@naver.com",
  sms_number: "010-4708-6091",
  address: "서울특별시 마포구 동교로22길 19, 청송빌딩 4층",
  address_detail: "",
  business_hours: "평일 09:00 ~ 18:00",
  kakao_id: "",
  slogan: "프랜차이즈 비교는 필수입니다",
  slogan_sub: "함께 만드는 성공 스토리",
  slogan_en: "MyFran Premium Franchise",
  copyright: "© 2025 마이프랜. All rights reserved.",
  sns_kakao_channel: "",
  sns_instagram: "",
  sns_youtube: "",
  sns_blog: "",
  terms: "",
  privacy_policy: "",
};
const insertSetting = db.prepare(
  "INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)"
);
for (const [k, v] of Object.entries(defaults)) {
  insertSetting.run(k, v);
}
console.log("  ✓ default settings");

// ── Homepage sections ──
console.log("Seeding homepage sections...");
const homepageSections: Record<string, unknown> = {
  stats: [
    { icon: "trophy", value: "100+", label: "입점 브랜드" },
    { icon: "people", value: "1,000+", label: "가맹 상담 진행" },
    { icon: "chart", value: "500+", label: "성공 창업 사례" },
    { icon: "shield", value: "98%", label: "고객 만족도" },
  ],
  benefits: [
    { icon: "speaker", title: "자사 홈페이지 광고비", accent: "매월 1억원 집행" },
    { icon: "book", title: "창업매거진 전국 배포", accent: "무료 게재" },
    { icon: "monitor", title: "신생 브랜드", subtitle: "홈페이지 제작" },
    { icon: "file", title: "카탈로그 제작" },
    { icon: "chart", title: "마케팅비 지원" },
    { icon: "people", title: "창업박람회", subtitle: "입점 대행" },
  ],
  plans: [
    {
      tier: "best", eyebrow: "RECOMMENDED", no: "01",
      name: "베스트 브랜드", desc: "메인 최상단 노출, 가장 먼저 보이는 자리",
      price: "1,000", featured: true,
      specs: [
        { label: "노출 위치", value: "메인 1단" },
        { label: "브랜드관 카드", value: "포함" },
        { label: "추천 브랜드 노출", value: "포함" },
      ],
    },
    {
      tier: "premium", eyebrow: "PREMIUM", no: "02",
      name: "프리미엄 브랜드", desc: "검증된 업종별 브랜드 영역 노출",
      price: "700", featured: false,
      specs: [
        { label: "노출 위치", value: "메인 2단" },
        { label: "브랜드관 카드", value: "포함" },
        { label: "추천 브랜드 노출", value: "—" },
      ],
    },
    {
      tier: "special", eyebrow: "SPECIAL", no: "03",
      name: "스페셜 브랜드", desc: "성장 가능성이 높은 생활밀착형 브랜드",
      price: "500", featured: false,
      specs: [
        { label: "노출 위치", value: "메인 3단" },
        { label: "브랜드관 카드", value: "포함" },
        { label: "추천 브랜드 노출", value: "—" },
      ],
    },
  ],
  heroServices: [
    { icon: "people", label: "가맹영업대행" },
    { icon: "chart", label: "상권분석" },
    { icon: "home", label: "가맹본부 구축" },
    { icon: "monitor", label: "온라인 창업박람회" },
    { icon: "shield", label: "투자대행" },
  ],
  listingBenefits: [
    { title: "자사 홈페이지 광고비", desc: "매월 1억원 규모의 온라인 마케팅 집행으로 브랜드 노출 극대화" },
    { title: "창업매거진 전국 배포", desc: "오프라인 매거진에 브랜드 무료 게재, 전국 예비 창업자에게 도달" },
    { title: "온라인 창업박람회", desc: "365일 운영되는 온라인 박람회에서 상시 브랜드 홍보" },
    { title: "1:1 창업 상담 연결", desc: "관심 고객을 직접 브랜드 본사에 연결해 상담률 극대화" },
    { title: "홈페이지 제작 지원", desc: "신생 브랜드를 위한 전문 홈페이지 제작 서비스 제공" },
    { title: "마케팅비 지원", desc: "입점 브랜드에 디지털 마케팅 비용 일부 지원" },
  ],
};
const insertSection = db.prepare(
  "INSERT OR IGNORE INTO homepage_sections (section_key, content_json) VALUES (?, ?)"
);
for (const [key, data] of Object.entries(homepageSections)) {
  insertSection.run(key, JSON.stringify(data));
}
console.log("  ✓ homepage sections");

// ── Bootstrap admin user ──
console.log("Seeding admin user...");
function hashSync(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${key}`;
}
const adminEmail = process.env.ADMIN_EMAIL || "admin@myfran.com";
const adminPassword = process.env.ADMIN_PASSWORD || "admin1234!";
const existingAdmin = db.prepare("SELECT id FROM users WHERE email = ?").get(adminEmail);
if (!existingAdmin) {
  db.prepare(
    "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)"
  ).run(adminEmail, hashSync(adminPassword), "관리자", "super_admin");
  console.log(`  ✓ admin user created (${adminEmail})`);
} else {
  console.log("  ✓ admin user already exists");
}

db.close();
console.log("\n✅ Seed complete!");
