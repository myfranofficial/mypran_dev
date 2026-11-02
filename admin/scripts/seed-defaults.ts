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

// ── Notices (공지사항) ──
console.log("Seeding notices...");
const noticesData = [
  { category: "공지", title: "마이프랜 온라인 창업박람회 오픈 안내", content: "마이프랜 온라인 창업박람회가 공식 오픈하였습니다. 다양한 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청해 보세요.", date: "2026-10-15", is_pinned: 1 },
  { category: "이벤트", title: "10월 창업 컨설팅 무료 이벤트", content: "10월 한 달간 마이프랜을 통해 상담 신청하시는 모든 분께 무료 창업 컨설팅을 제공합니다.", date: "2026-10-10", is_pinned: 0 },
  { category: "공지", title: "신규 입점 브랜드 안내 — 메가커피, 교촌치킨 외 5개", content: "이번 달 새롭게 입점한 7개 브랜드를 소개합니다.", date: "2026-10-05", is_pinned: 0 },
  { category: "성공사례", title: "창업 성공 사례: 메가커피 강남점 이야기", content: "직장인에서 카페 사장님으로 전환한 메가커피 강남점 김OO 대표의 성공 스토리를 공유합니다.", date: "2026-09-28", is_pinned: 0 },
  { category: "공지", title: "마이프랜 홈페이지 리뉴얼 안내", content: "더 나은 서비스를 위해 마이프랜 홈페이지를 리뉴얼하였습니다.", date: "2026-09-20", is_pinned: 0 },
];
const noticeCount = (db.prepare("SELECT COUNT(*) AS c FROM notices").get() as { c: number }).c;
if (noticeCount === 0) {
  const insertNotice = db.prepare(
    "INSERT INTO notices (category, title, content, date, is_pinned, is_active) VALUES (?, ?, ?, ?, ?, 1)"
  );
  for (const n of noticesData) insertNotice.run(n.category, n.title, n.content, n.date, n.is_pinned);
  console.log(`  ✓ ${noticesData.length} notices added`);
} else {
  console.log(`  ✓ notices already exist (${noticeCount} items)`);
}

// ── FAQ ──
console.log("Seeding FAQ...");
const faqData = [
  { category: "창업 문의", question: "창업 비용은 얼마나 드나요?", answer: "마이프랜을 통한 프랜차이즈 창업 비용은 브랜드별·규모별로 상이합니다. 상담을 통해 정확한 비용을 안내드립니다." },
  { category: "창업 문의", question: "창업 경험이 없어도 가능한가요?", answer: "네, 가능합니다. 마이프랜은 체계적인 교육 프로그램과 본사 지원 시스템을 통해 초보 창업자도 안정적으로 운영할 수 있도록 지원합니다." },
  { category: "창업 문의", question: "창업 절차는 어떻게 되나요?", answer: "상담 신청 → 상권 분석 → 가맹 계약 → 인테리어 시공 → 운영 교육 → 그랜드 오픈 순서로 진행됩니다." },
  { category: "창업 문의", question: "지사장 모집은 어떤 조건인가요?", answer: "지사장 계약비용 300만원이며, 1주일 이내 개인 변심 시 계약파기 100% 환불됩니다." },
  { category: "이용 안내", question: "마이프랜의 주요 서비스는?", answer: "프랜차이즈 브랜드 비교, 가맹 상담 연결, 상권 분석, 교육 지원 등을 제공합니다." },
  { category: "이용 안내", question: "상담 신청은 어떻게 하나요?", answer: "홈페이지 상담 신청 폼을 작성하거나 전화로 문의하시면 됩니다. (010-4708-6091)" },
  { category: "이용 안내", question: "상권 분석 서비스는 무료인가요?", answer: "네, 마이프랜의 모든 서비스는 무료입니다." },
  { category: "멤버십", question: "회원 가입하면 어떤 혜택이 있나요?", answer: "맞춤 브랜드 추천, 우선 상담 예약, 특별 할인 등의 혜택을 받으실 수 있습니다." },
  { category: "멤버십", question: "회원가입비가 있나요?", answer: "회원가입은 무료입니다." },
  { category: "기타", question: "브랜드를 입점시키고 싶은데 어떻게 하나요?", answer: "마이프랜 관리자에게 문의하시면 입점 절차를 안내드립니다." },
];
const faqCount = (db.prepare("SELECT COUNT(*) AS c FROM faq_items").get() as { c: number }).c;
if (faqCount === 0) {
  const insertFaq = db.prepare(
    "INSERT INTO faq_items (category, question, answer, sort_order) VALUES (?, ?, ?, ?)"
  );
  faqData.forEach((f, i) => insertFaq.run(f.category, f.question, f.answer, i));
  console.log(`  ✓ ${faqData.length} FAQ items added`);
} else {
  console.log(`  ✓ FAQ already exists (${faqCount} items)`);
}

// ── Events ──
console.log("Seeding events...");
const eventsData = [
  { title: "10월 창업 컨설팅 특별 프로모션", description: "마이프랜과 함께하는 특별 상담 이벤트", start_date: "2026-10-01", end_date: "2026-10-31", status: "진행중" },
  { title: "신규 입점 브랜드 최대 20% 할인", description: "새롭게 입점한 브랜드의 초기 가맹비 할인 혜택", start_date: "2026-09-15", end_date: "2026-12-31", status: "진행중" },
  { title: "마이프랜 회원 우대 프로그램", description: "가입 시 첫 상담 무료 + 전용 혜택", start_date: "2026-08-01", end_date: "2026-12-31", status: "진행중" },
];
const eventCount = (db.prepare("SELECT COUNT(*) AS c FROM events").get() as { c: number }).c;
if (eventCount === 0) {
  const insertEvent = db.prepare(
    "INSERT INTO events (title, description, start_date, end_date, status, is_active) VALUES (?, ?, ?, ?, ?, 1)"
  );
  for (const e of eventsData) insertEvent.run(e.title, e.description, e.start_date, e.end_date, e.status);
  console.log(`  ✓ ${eventsData.length} events added`);
} else {
  console.log(`  ✓ events already exist (${eventCount} items)`);
}

// ── Videos ──
console.log("Seeding videos...");
const videosData = [
  { title: "마이프랜 서비스 소개", description: "마이프랜이 제공하는 서비스와 장점을 소개합니다", category: "브랜드 소개", date: "2026-10-01" },
  { title: "창업 상담 프로세스 안내", description: "마이프랜과 함께하는 창업 상담 절차를 안내합니다", category: "상담 안내", date: "2026-09-20" },
  { title: "창업 성공 사례: 메가커피", description: "마이프랜을 통해 창업한 메가커피 가맹점주의 성공 스토리", category: "창업 성공사례", date: "2026-09-15" },
];
const videoCount = (db.prepare("SELECT COUNT(*) AS c FROM videos").get() as { c: number }).c;
if (videoCount === 0) {
  const insertVideo = db.prepare(
    "INSERT INTO videos (title, description, category, date, sort_order) VALUES (?, ?, ?, ?, ?)"
  );
  videosData.forEach((v, i) => insertVideo.run(v.title, v.description, v.category, v.date, i));
  console.log(`  ✓ ${videosData.length} videos added`);
} else {
  console.log(`  ✓ videos already exist (${videoCount} items)`);
}

// ── Downloads ──
console.log("Seeding downloads...");
const downloadsData = [
  { title: "마이프랜 서비스 소개 자료", description: "마이프랜의 서비스, 특장점, 입점 브랜드를 소개하는 자료입니다.", filename: "Mifriend_Service_Guide_2026.pdf", file_size: "5.2 MB" },
  { title: "창업 안내 가이드", description: "마이프랜을 통한 프랜차이즈 창업에 필요한 모든 정보.", filename: "Mifriend_Franchise_Guide_2026.pdf", file_size: "8.3 MB" },
  { title: "브랜드 카탈로그", description: "마이프랜에 입점한 프랜차이즈 브랜드의 상세 정보 카탈로그.", filename: "Mifriend_Brand_Catalog_2026.pdf", file_size: "12.5 MB" },
  { title: "상담 신청서", description: "창업 상담을 신청하는 양식입니다.", filename: "Mifriend_Consulting_Form.pdf", file_size: "2.1 MB" },
];
const downloadCount = (db.prepare("SELECT COUNT(*) AS c FROM downloads").get() as { c: number }).c;
if (downloadCount === 0) {
  const insertDownload = db.prepare(
    "INSERT INTO downloads (title, description, filename, file_size) VALUES (?, ?, ?, ?)"
  );
  for (const d of downloadsData) insertDownload.run(d.title, d.description, d.filename, d.file_size);
  console.log(`  ✓ ${downloadsData.length} downloads added`);
} else {
  console.log(`  ✓ downloads already exist (${downloadCount} items)`);
}

// ── Stores ──
console.log("Seeding stores...");
const storeCount = (db.prepare("SELECT COUNT(*) AS c FROM stores").get() as { c: number }).c;
if (storeCount === 0) {
  db.prepare(
    "INSERT INTO stores (name, address, phone, hours, is_active, sort_order) VALUES (?, ?, ?, ?, 1, 0)"
  ).run("마이프랜 본사", "서울특별시 마포구 동교로22길 19, 청송빌딩 4층", "010-4708-6091", "평일 09:00 ~ 18:00");
  console.log("  ✓ 1 store added");
} else {
  console.log(`  ✓ stores already exist (${storeCount} items)`);
}

// ── Gallery (기본 이미지) ──
console.log("Seeding gallery...");
const galleryCount = (db.prepare("SELECT COUNT(*) AS c FROM gallery_images").get() as { c: number }).c;
if (galleryCount === 0) {
  const galleryData = [
    { title: "마이프랜 사무실 전경", category: "사무실", branch: "강남 본사" },
    { title: "마이프랜 상담 공간", category: "상담실", branch: "강남 본사" },
    { title: "마이프랜 회의실", category: "사무실", branch: "강남 본사" },
    { title: "창업박람회 개최", category: "이벤트", branch: "이벤트" },
    { title: "브랜드 소개 세미나", category: "이벤트", branch: "이벤트" },
  ];
  const insertGallery = db.prepare(
    "INSERT INTO gallery_images (title, category, branch, image_url, sort_order) VALUES (?, ?, ?, '', ?)"
  );
  galleryData.forEach((g, i) => insertGallery.run(g.title, g.category, g.branch, i));
  console.log(`  ✓ ${galleryData.length} gallery items added`);
} else {
  console.log(`  ✓ gallery already exists (${galleryCount} items)`);
}

db.close();
console.log("\n✅ Default seeding complete!");
