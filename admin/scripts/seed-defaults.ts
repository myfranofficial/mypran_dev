/**
 * 기존 DB에 기본값만 추가하는 스크립트.
 * 이미 존재하는 값은 덮어쓰지 않음 (INSERT OR IGNORE).
 *
 * Usage (from admin/ directory):
 *   npx tsx scripts/seed-defaults.ts
 */

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DB_DIR = path.join(__dirname, "..", "data");
const DB_PATH = path.join(DB_DIR, "myfran.db");

if (!fs.existsSync(DB_PATH)) {
  console.error(`DB not found: ${DB_PATH}`);
  console.error("Run 'npx tsx scripts/seed.ts' first to create the database.");
  process.exit(1);
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

// ── Settings ──
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
let settingsInserted = 0;
for (const [k, v] of Object.entries(defaults)) {
  const { changes } = insertSetting.run(k, v);
  if (changes > 0) settingsInserted++;
}
console.log(`  ✓ ${settingsInserted} new settings added (${Object.keys(defaults).length - settingsInserted} already existed)`);

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
let sectionsInserted = 0;
for (const [key, data] of Object.entries(homepageSections)) {
  const { changes } = insertSection.run(key, JSON.stringify(data));
  if (changes > 0) sectionsInserted++;
}
console.log(`  ✓ ${sectionsInserted} new sections added (${Object.keys(homepageSections).length - sectionsInserted} already existed)`);

db.close();
console.log("\n✅ Default seeding complete!");
