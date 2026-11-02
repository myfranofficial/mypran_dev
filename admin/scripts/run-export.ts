/**
 * CLI에서 DB → JSON export를 실행하는 독립 스크립트.
 * json-export.ts를 직접 사용하지 않고, better-sqlite3로 직접 읽어
 * server-only / path alias 의존성을 우회한다.
 *
 * Usage (from admin/ directory):
 *   JSON_EXPORT_DIR=/path/to/web/data npx tsx scripts/run-export.ts [db-path]
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dbPath =
  process.argv[2] || path.join(__dirname, "..", "data", "myfran.db");
const exportDir =
  process.env.JSON_EXPORT_DIR ||
  path.join(__dirname, "..", "..", "src", "static", "data");

console.log(`DB:  ${dbPath}`);
console.log(`Dir: ${exportDir}`);

const db = new Database(dbPath);

function writeJson(filename: string, data: unknown): void {
  fs.mkdirSync(exportDir, { recursive: true });
  const target = path.join(exportDir, filename);
  fs.writeFileSync(target, JSON.stringify(data, null, 2), "utf-8");
}

function get(key: string, fallback = ""): string {
  const row = db
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get(key) as { value: string | null } | undefined;
  return row?.value || fallback;
}

function getContact() {
  return {
    phone: get("phone", "010-4708-6091"),
    hours: get("business_hours", "평일 09:00 ~ 18:00"),
  };
}

function getSection(key: string): unknown | null {
  const row = db
    .prepare("SELECT content_json FROM homepage_sections WHERE section_key = ?")
    .get(key) as { content_json: string | null } | undefined;
  return row?.content_json ? JSON.parse(row.content_json) : null;
}

// ── Export functions ──

function exportSite() {
  writeJson("site.json", {
    phone: get("phone", "010-4708-6091"),
    email: get("email", "myfriend2026@naver.com"),
    sms: get("sms_number", "010-4708-6091"),
    address: get("address", "서울특별시 마포구 동교로22길 19, 청송빌딩 4층"),
    addressDetail: get("address_detail"),
    hours: get("business_hours", "평일 09:00 ~ 18:00"),
    slogan: get("slogan", "프랜차이즈 비교는 필수입니다"),
    sloganSub: get("slogan_sub", "함께 만드는 성공 스토리"),
    sloganEn: get("slogan_en", "MyFran Premium Franchise"),
    copyright: get("copyright", "© 2026 마이프랜. All rights reserved."),
    sns: {
      kakao: get("sns_kakao_channel"),
      instagram: get("sns_instagram"),
      youtube: get("sns_youtube"),
      blog: get("sns_blog"),
    },
    terms: get("terms"),
    privacyPolicy: get("privacy_policy"),
  });
  console.log("  ✓ site.json");
}

function exportHomepage() {
  const stats = getSection("stats") ?? [
    { icon: "trophy", value: "100+", label: "입점 브랜드" },
    { icon: "people", value: "1,000+", label: "가맹 상담 진행" },
    { icon: "chart", value: "500+", label: "성공 창업 사례" },
    { icon: "shield", value: "98%", label: "고객 만족도" },
  ];
  const benefits = getSection("benefits") ?? [];
  const plans = getSection("plans") ?? [];
  const heroServices = getSection("heroServices") ?? [];
  const listingBenefits = getSection("listingBenefits") ?? [];
  writeJson("homepage.json", { stats, benefits, plans, heroServices, listingBenefits });
  console.log("  ✓ homepage.json");
}

function exportBanners() {
  const now = new Date().toISOString().slice(0, 10);
  const banners = db
    .prepare(
      `SELECT * FROM banners WHERE is_active = 1
       AND (start_at IS NULL OR start_at <= ?)
       AND (end_at IS NULL OR end_at >= ?)
       ORDER BY sort_order ASC, id ASC`
    )
    .all(now, now) as any[];
  writeJson("banners.json", {
    banners: banners.map((b) => ({
      title: b.title || "",
      subtitle: b.subtitle || "",
      image: b.image_url || "",
      imageMobile: b.image_url_mobile || "",
      link: b.link_url || "",
    })),
  });
  console.log("  ✓ banners.json");
}

function exportStores() {
  const stores = db
    .prepare("SELECT * FROM stores WHERE is_active = 1 ORDER BY sort_order ASC, id ASC")
    .all() as any[];
  const contact = getContact();
  writeJson("stores.json", {
    hero: { label: "Store Guide", title: "마이프랜\n매장안내", subtitle: "전국 마이프랜 매장을 소개합니다." },
    intro: { title: "전국 어디서나 만나는\n프리미엄 당구 클럽", desc: "" },
    stores: stores.map((s) => ({
      name: s.name,
      address: s.address || "",
      size: s.size || "",
      tables: s.tables_count || 0,
      phone: s.phone || "",
      hours: s.hours || "",
      features: s.features
        ? (() => { try { return JSON.parse(s.features); } catch { return s.features.split(",").map((f: string) => f.trim()).filter(Boolean); } })()
        : [],
      image: s.image_url || "",
      isNew: !!s.is_new,
    })),
    interior: { label: "Interior Design", title: "본사 직영 시공", desc: "" },
    contact,
  });
  console.log("  ✓ stores.json");
}

function exportNews() {
  const notices = db
    .prepare("SELECT * FROM notices WHERE is_active = 1 ORDER BY is_pinned DESC, created_at DESC, id DESC")
    .all() as any[];
  const contact = getContact();
  writeJson("news.json", {
    hero: { label: "News & Notice", title: "뉴스 / 소식", subtitle: "" },
    notices: notices.map((n) => ({
      id: n.id,
      category: n.category || "공지",
      title: n.title,
      content: n.content || "",
      date: n.date || n.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
      isPinned: !!n.is_pinned,
    })),
    contact,
  });
  console.log("  ✓ news.json");
}

function exportEvents() {
  const events = db
    .prepare("SELECT * FROM events WHERE is_active = 1 ORDER BY created_at DESC")
    .all() as any[];
  writeJson("events.json", {
    hero: { label: "EVENTS", title: "이벤트" },
    events: events.map((e) => ({
      title: e.title,
      desc: e.description || "",
      image: e.image_url || "",
      startDate: e.start_date || "",
      endDate: e.end_date || "",
      status: e.status || "진행중",
    })),
    contact: getContact(),
  });
  console.log("  ✓ events.json");
}

function exportFaq() {
  const items = db
    .prepare("SELECT * FROM faq_items ORDER BY sort_order ASC, id ASC")
    .all() as any[];
  const categories = ["전체", ...new Set(items.map((i: any) => i.category).filter(Boolean))] as string[];
  writeJson("faq.json", {
    hero: { label: "FAQ", title: "자주 묻는 질문" },
    categories,
    items: items.map((i) => ({ category: i.category || "", question: i.question, answer: i.answer || "" })),
  });
  console.log("  ✓ faq.json");
}

function exportDownloads() {
  const files = db.prepare("SELECT * FROM downloads ORDER BY created_at DESC").all() as any[];
  writeJson("downloads.json", {
    hero: { label: "DOWNLOADS", title: "자료실" },
    files: files.map((f) => ({
      title: f.title,
      desc: f.description || "",
      filename: f.filename || "",
      fileUrl: f.file_url || "",
      size: f.file_size || "",
    })),
  });
  console.log("  ✓ downloads.json");
}

function exportGallery() {
  const images = db.prepare("SELECT * FROM gallery_images ORDER BY sort_order ASC, id DESC").all() as any[];
  const branches = [...new Set(images.map((i: any) => i.branch).filter(Boolean))] as string[];
  writeJson("gallery.json", {
    hero: { label: "GALLERY", title: "매장 갤러리" },
    categories: ["전체", ...branches],
    images: images.map((i) => ({ title: i.title || "", branch: i.branch || "", src: i.image_url || "" })),
  });
  console.log("  ✓ gallery.json");
}

function exportVideos() {
  const videos = db.prepare("SELECT * FROM videos ORDER BY sort_order ASC, id DESC").all() as any[];
  const categories = ["전체", ...new Set(videos.map((v: any) => v.category).filter(Boolean))] as string[];
  writeJson("videos.json", {
    hero: { label: "VIDEO GALLERY", title: "영상 갤러리" },
    categories,
    videos: videos.map((v) => ({
      title: v.title || "",
      desc: v.description || "",
      category: v.category || "",
      thumbnail: v.thumbnail_url || (v.youtube_id ? `https://img.youtube.com/vi/${v.youtube_id}/maxresdefault.jpg` : ""),
      youtubeId: v.youtube_id || "",
    })),
  });
  console.log("  ✓ videos.json");
}

function exportPopups() {
  const now = new Date().toISOString().slice(0, 10);
  const popups = db
    .prepare(
      `SELECT * FROM popups WHERE is_active = 1
       AND (start_at IS NULL OR start_at <= ?)
       AND (end_at IS NULL OR end_at >= ?)
       ORDER BY sort_order ASC`
    )
    .all(now, now) as any[];
  writeJson("popups.json", { popups: popups.map((p) => ({ id: p.id, title: p.title || "", image: p.image_url || "", link: p.link_url || "" })) });
  console.log("  ✓ popups.json");
}

function exportReviews() {
  const reviews = db.prepare("SELECT * FROM reviews WHERE is_active = 1 ORDER BY created_at DESC").all() as any[];
  writeJson("reviews.json", { reviews: reviews.map((r) => ({ author: r.author || "", rating: r.rating || 5, content: r.content || "" })) });
  console.log("  ✓ reviews.json");
}

function exportBrands() {
  const categories = db.prepare("SELECT * FROM brand_categories WHERE is_active = 1 ORDER BY sort_order ASC").all() as any[];
  const brands = db
    .prepare(`SELECT b.*, c.name AS category_name FROM brands b LEFT JOIN brand_categories c ON b.category_id = c.id WHERE b.is_active = 1 ORDER BY b.sort_order ASC`)
    .all() as any[];
  writeJson("brands.json", {
    categories: categories.map((c: any) => ({ id: c.id, name: c.name })),
    brands: brands.map((b: any) => ({
      name: b.name, category: b.category_name || "", tagline: b.tagline || "",
      description: b.description || "", foundingCost: b.founding_cost || "",
      storeCount: b.store_count || 0, logo: b.logo_url || "", image: b.main_image_url || "",
      features: b.features ? JSON.parse(b.features) : [],
      phone: b.phone || "", kakaoUrl: b.kakao_url || "", isFeatured: !!b.is_featured,
    })),
  });
  console.log("  ✓ brands.json");
}

function exportPageImages() {
  writeJson("page-images.json", {});
  console.log("  ✓ page-images.json");
}

// ── Run all ──

console.log("\nExporting...");
exportSite();
exportHomepage();
exportBanners();
exportStores();
exportNews();
exportEvents();
exportFaq();
exportDownloads();
exportGallery();
exportVideos();
exportPopups();
exportReviews();
exportBrands();
exportPageImages();

db.close();
console.log("\n✅ All exports complete!");
