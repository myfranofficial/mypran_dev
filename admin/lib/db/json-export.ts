import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getDb } from "./index";
import { imageUrl } from "@/lib/storage";

/**
 * DB → JSON 자동 재생성 시스템.
 * 어드민에서 저장 시 관련 JSON 파일을 atomic write 한다.
 * 프론트엔드는 기존 JSON fetch를 그대로 사용.
 */

const EXPORT_DIR =
  process.env.JSON_EXPORT_DIR
    ? path.resolve(process.env.JSON_EXPORT_DIR)
    : path.join(process.cwd(), "..", "src", "static", "data");

function writeJson(filename: string, data: unknown): void {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
  const target = path.join(EXPORT_DIR, filename);
  const tmp = target + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmp, target);
}

function getContact(): { phone: string; hours: string } {
  const db = getDb();
  const get = (k: string, fallback: string) => {
    const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(k) as { value: string | null } | undefined;
    return row?.value || fallback;
  };
  return {
    phone: get("phone", "010-4708-6091"),
    hours: get("business_hours", "평일 09:00 ~ 18:00"),
  };
}

function resolveUrl(key: string | null): string {
  if (!key) return "";
  return imageUrl(key);
}

// ── 개별 Export 함수 ──

export function exportSite(): void {
  const db = getDb();
  const get = (k: string, fallback: string = "") => {
    const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(k) as { value: string | null } | undefined;
    return row?.value || fallback;
  };
  writeJson("site.json", {
    phone: get("phone", "010-4708-6091"),
    sms: get("sms_number", "010-4708-6091"),
    address: get("address", "서울시 종로구 종로 191, 2층"),
    addressDetail: get("address_detail", "(종로5가역 12번출구)"),
    hours: get("business_hours", "평일 09:00 ~ 18:00"),
    slogan: get("slogan", "당구, 그 이상의 가치!"),
    sloganSub: get("slogan_sub", "함께 만드는 성공 스토리"),
    sloganEn: get("slogan_en", "Premium Billiards Life"),
    copyright: get("copyright", "© 2025 HI Q BILLIARDS. All rights reserved."),
    sns: {
      kakao: get("sns_kakao_channel"),
      instagram: get("sns_instagram"),
      youtube: get("sns_youtube"),
      blog: get("sns_blog"),
    },
  });
}

export function exportBanners(): void {
  const db = getDb();
  const now = new Date().toISOString().slice(0, 10);
  const banners = db.prepare(
    `SELECT * FROM banners WHERE is_active = 1
     AND (start_at IS NULL OR start_at <= ?)
     AND (end_at IS NULL OR end_at >= ?)
     ORDER BY sort_order ASC, id ASC`
  ).all(now, now) as any[];

  writeJson("banners.json", {
    banners: banners.map((b) => ({
      title: b.title || "",
      subtitle: b.subtitle || "",
      image: resolveUrl(b.image_url),
      imageMobile: b.image_url_mobile ? resolveUrl(b.image_url_mobile) : "",
      link: b.link_url || "",
    })),
  });
}

export function exportStores(): void {
  const db = getDb();
  const stores = db.prepare("SELECT * FROM stores WHERE is_active = 1 ORDER BY sort_order ASC, id ASC").all() as any[];
  const contact = getContact();

  // page_content에서 stores 페이지 hero/intro 가져오기
  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'stores' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const introRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'stores' AND section = 'intro'").get() as { content_json: string | null } | undefined;
  const interiorRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'stores' AND section = 'interior'").get() as { content_json: string | null } | undefined;

  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "Store Guide",
    title: "하이큐 빌리어드\n매장안내",
    subtitle: "전국 하이큐 빌리어드 매장을 소개합니다.",
    image: "/static/images/hero-2.jpg",
  };
  const intro = introRow?.content_json ? JSON.parse(introRow.content_json) : {
    title: "전국 어디서나 만나는\n프리미엄 당구 클럽",
    desc: "",
  };
  const interior = interiorRow?.content_json ? JSON.parse(interiorRow.content_json) : {
    label: "Interior Design",
    title: "본사 직영 시공,\n통일된 프리미엄 공간",
    desc: "",
    points: [],
  };

  // store_photos 조인
  const photosStmt = db.prepare(
    "SELECT image_url, title, is_representative FROM store_photos WHERE store_id = ? ORDER BY sort_order ASC, id ASC"
  );

  writeJson("stores.json", {
    hero,
    intro,
    stores: stores.map((s) => {
      const photos = photosStmt.all(s.id) as { image_url: string; title: string | null; is_representative: number }[];
      const photoUrls = photos.map((p) => resolveUrl(p.image_url));
      const repPhoto = photos.find((p) => p.is_representative);
      const image = repPhoto ? resolveUrl(repPhoto.image_url) : (photoUrls[0] || resolveUrl(s.image_url));
      return {
        name: s.name,
        address: s.address || "",
        size: s.size || "",
        tables: s.tables_count || 0,
        phone: s.phone || "",
        hours: s.hours || "",
        features: s.features ? JSON.parse(s.features) : [],
        image,
        photos: photoUrls.length > 0 ? photoUrls : [resolveUrl(s.image_url)],
        isNew: !!s.is_new,
      };
    }),
    interior,
    contact,
  });
}

export function exportGallery(): void {
  const db = getDb();

  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'gallery' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "GALLERY",
    title: "매장 갤러리",
    desc: "프리미엄 공간을 직접 확인하세요",
  };

  // store_photos를 매장별로 그룹핑하여 gallery.json 생성
  const rows = db.prepare(
    `SELECT sp.image_url, sp.title, sp.is_representative, s.name AS branch
     FROM store_photos sp
     JOIN stores s ON sp.store_id = s.id
     WHERE s.is_active = 1
     ORDER BY s.sort_order ASC, s.id ASC, sp.is_representative DESC, sp.sort_order ASC, sp.id ASC`
  ).all() as { image_url: string; title: string | null; is_representative: number; branch: string }[];

  // store_photos가 비어 있으면 기존 gallery_images 테이블에서 fallback
  let images: { title: string; branch: string; src: string }[];
  let branches: string[];

  if (rows.length > 0) {
    branches = [...new Set(rows.map((r) => r.branch))];
    images = rows.map((r) => ({
      title: r.title || `${r.branch} 사진`,
      branch: r.branch,
      src: resolveUrl(r.image_url),
    }));
  } else {
    const legacyImages = db.prepare("SELECT * FROM gallery_images ORDER BY sort_order ASC, id DESC").all() as any[];
    branches = [...new Set(legacyImages.map((i: any) => i.branch).filter(Boolean))] as string[];
    images = legacyImages.map((i: any) => ({
      title: i.title || "",
      branch: i.branch || "",
      src: resolveUrl(i.image_url),
    }));
  }

  writeJson("gallery.json", {
    hero,
    categories: ["전체", ...branches],
    images,
  });
}

export function exportVideos(): void {
  const db = getDb();
  const videos = db.prepare("SELECT * FROM videos ORDER BY sort_order ASC, id DESC").all() as any[];
  const categories = ["전체", ...new Set(videos.map((v: any) => v.category).filter(Boolean))];

  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'videos' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "VIDEO GALLERY",
    title: "영상 갤러리",
    desc: "최고의 순간들이 만들어지는 공간",
  };

  writeJson("videos.json", {
    hero,
    categories,
    videos: videos.map((v) => ({
      title: v.title || "",
      desc: v.description || "",
      category: v.category || "",
      thumbnail: v.thumbnail_url
        ? resolveUrl(v.thumbnail_url)
        : v.youtube_id
          ? `https://img.youtube.com/vi/${v.youtube_id}/maxresdefault.jpg`
          : "",
      youtubeId: v.youtube_id || "",
      date: v.date || "",
    })),
  });
}

export function exportNews(): void {
  const db = getDb();
  const notices = db.prepare("SELECT * FROM notices WHERE is_active = 1 ORDER BY is_pinned DESC, created_at DESC, id DESC").all() as any[];
  const contact = getContact();

  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'news' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "News & Notice",
    title: "뉴스 / 소식",
    subtitle: "하이큐 빌리어드의 공지사항과 최신 소식을 전해드립니다.",
    image: "/static/images/hero-3.jpg",
  };

  writeJson("news.json", {
    hero,
    notices: notices.map((n) => ({
      id: n.id,
      category: n.category || "공지",
      title: n.title,
      content: n.content || "",
      date: n.date || n.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
      isPinned: !!n.is_pinned,
    })),
    reviews: [],
    contact,
  });
}

export function exportEvents(): void {
  const db = getDb();
  const events = db.prepare("SELECT * FROM events WHERE is_active = 1 ORDER BY created_at DESC, id DESC").all() as any[];
  const contact = getContact();

  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'events' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "EVENTS",
    title: "이벤트",
    desc: "하이큐빌리어드의 다양한 이벤트에 참여하세요",
  };

  writeJson("events.json", {
    hero,
    tabs: ["진행 중 이벤트", "이벤트 결과"],
    events: events.map((e) => ({
      title: e.title,
      desc: e.description || "",
      image: resolveUrl(e.image_url),
      startDate: e.start_date || "",
      endDate: e.end_date || "",
      status: e.status || "진행중",
    })),
    contact,
  });
}

export function exportFaq(): void {
  const db = getDb();
  const items = db.prepare("SELECT * FROM faq_items ORDER BY sort_order ASC, id ASC").all() as any[];
  const categories = ["전체", ...new Set(items.map((i: any) => i.category).filter(Boolean))];

  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'faq' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "FAQ",
    title: "자주 묻는 질문",
    desc: "궁금한 점을 빠르게 확인하세요",
  };

  writeJson("faq.json", {
    hero,
    categories,
    items: items.map((i) => ({
      category: i.category || "",
      question: i.question,
      answer: i.answer || "",
    })),
  });
}

export function exportDownloads(): void {
  const db = getDb();
  const files = db.prepare("SELECT * FROM downloads ORDER BY created_at DESC, id DESC").all() as any[];

  const heroRow = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'downloads' AND section = 'hero'").get() as { content_json: string | null } | undefined;
  const hero = heroRow?.content_json ? JSON.parse(heroRow.content_json) : {
    label: "DOWNLOADS",
    title: "자료실",
    desc: "브랜드 자료 및 안내 문서를 다운로드하세요",
  };

  writeJson("downloads.json", {
    hero,
    files: files.map((f) => ({
      title: f.title,
      desc: f.description || "",
      filename: f.filename || "",
      size: f.file_size || "",
      date: f.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
      downloads: f.download_count || 0,
    })),
  });
}

export function exportBenefits(): void {
  const db = getDb();
  const row = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'benefits' AND section = 'full'").get() as { content_json: string | null } | undefined;
  if (row?.content_json) {
    writeJson("benefits.json", JSON.parse(row.content_json));
  }
}

export function exportFranchise(): void {
  const db = getDb();
  const row = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'franchise' AND section = 'full'").get() as { content_json: string | null } | undefined;
  if (row?.content_json) {
    const data = JSON.parse(row.content_json);
    data.contact = getContact();
    writeJson("franchise.json", data);
  }
}

export function exportSupport(): void {
  const db = getDb();
  const row = db.prepare("SELECT content_json FROM page_content WHERE page_slug = 'support' AND section = 'full'").get() as { content_json: string | null } | undefined;
  if (row?.content_json) {
    const data = JSON.parse(row.content_json);
    data.contact = getContact();
    writeJson("support.json", data);
  }
}

export function exportPageImages(): void {
  const db = getDb();
  const rows = db.prepare(
    "SELECT section, content_json FROM page_content WHERE page_slug = '_images'"
  ).all() as { section: string; content_json: string | null }[];

  const images: Record<string, string> = {};
  for (const row of rows) {
    if (!row.content_json) continue;
    try {
      const data = JSON.parse(row.content_json) as Record<string, string>;
      for (const [key, val] of Object.entries(data)) {
        if (val) images[`${row.section}.${key}`] = resolveUrl(val);
      }
    } catch { /* skip malformed */ }
  }

  writeJson("page-images.json", images);
}

export function exportAll(): void {
  try { exportSite(); } catch (e) { console.error("[json-export] site:", e); }
  try { exportBanners(); } catch (e) { console.error("[json-export] banners:", e); }
  try { exportStores(); } catch (e) { console.error("[json-export] stores:", e); }
  try { exportGallery(); } catch (e) { console.error("[json-export] gallery:", e); }
  try { exportVideos(); } catch (e) { console.error("[json-export] videos:", e); }
  try { exportNews(); } catch (e) { console.error("[json-export] news:", e); }
  try { exportEvents(); } catch (e) { console.error("[json-export] events:", e); }
  try { exportFaq(); } catch (e) { console.error("[json-export] faq:", e); }
  try { exportDownloads(); } catch (e) { console.error("[json-export] downloads:", e); }
  try { exportBenefits(); } catch (e) { console.error("[json-export] benefits:", e); }
  try { exportFranchise(); } catch (e) { console.error("[json-export] franchise:", e); }
  try { exportSupport(); } catch (e) { console.error("[json-export] support:", e); }
  try { exportPageImages(); } catch (e) { console.error("[json-export] page-images:", e); }
}
