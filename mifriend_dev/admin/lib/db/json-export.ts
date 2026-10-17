import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getDb } from "./index";
import { imageUrl } from "@/lib/storage";

/**
 * DB → JSON 자동 재생성 시스템.
 * 어드민에서 저장 시 관련 JSON 파일을 atomic write 한다.
 * 프론트엔드는 JSON fetch를 그대로 사용.
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

function getSetting(k: string, fallback = ""): string {
  const db = getDb();
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(k) as { value: string | null } | undefined;
  return row?.value || fallback;
}

function resolveUrl(key: string | null): string {
  if (!key) return "";
  return imageUrl(key);
}

// ── 개별 Export 함수 ──

export function exportSite(): void {
  writeJson("site.json", {
    phone: getSetting("phone", "010-4708-6091"),
    address: getSetting("address", ""),
    addressDetail: getSetting("address_detail", ""),
    hours: getSetting("business_hours", "평일 09:00 ~ 18:00"),
    slogan: getSetting("slogan", "당신의 성공 창업, 마이프랜이 함께합니다"),
    copyright: getSetting("copyright", "© 2026 마이프랜. All rights reserved."),
    sns: {
      kakao: getSetting("sns_kakao_channel"),
      instagram: getSetting("sns_instagram"),
      youtube: getSetting("sns_youtube"),
      blog: getSetting("sns_blog"),
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

export function exportBrands(): void {
  const db = getDb();

  const categories = db
    .prepare("SELECT * FROM brand_categories WHERE is_active = 1 ORDER BY sort_order ASC, id ASC")
    .all() as any[];

  const brands = db
    .prepare(
      `SELECT b.*, c.name AS category_name
       FROM brands b
       LEFT JOIN brand_categories c ON b.category_id = c.id
       WHERE b.is_active = 1
       ORDER BY b.sort_order ASC, b.id ASC`
    )
    .all() as any[];

  writeJson("brands.json", {
    categories: categories.map((c) => ({
      id: c.id,
      name: c.name,
    })),
    brands: brands.map((b) => ({
      id: b.id,
      categoryId: b.category_id,
      categoryName: b.category_name || "",
      name: b.name,
      tagline: b.tagline || "",
      description: b.description || "",
      foundingCost: b.founding_cost || "",
      storeCount: b.store_count || 0,
      logo: resolveUrl(b.logo_url),
      mainImage: resolveUrl(b.main_image_url),
      images: b.images ? JSON.parse(b.images).map(resolveUrl) : [],
      features: b.features ? JSON.parse(b.features) : [],
      phone: b.phone || "",
      kakaoUrl: b.kakao_url || "",
      isFeatured: !!b.is_featured,
    })),
  });
}

export function exportNotices(): void {
  const db = getDb();
  const notices = db
    .prepare("SELECT * FROM notices WHERE is_active = 1 ORDER BY is_pinned DESC, created_at DESC, id DESC")
    .all() as any[];

  writeJson("notices.json", {
    notices: notices.map((n) => ({
      id: n.id,
      category: n.category || "공지",
      title: n.title,
      content: n.content || "",
      date: n.date || n.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
      isPinned: !!n.is_pinned,
    })),
  });
}

export function exportFaq(): void {
  const db = getDb();
  const items = db.prepare("SELECT * FROM faq_items ORDER BY sort_order ASC, id ASC").all() as any[];
  const categories = ["전체", ...new Set(items.map((i: any) => i.category).filter(Boolean))];

  writeJson("faq.json", {
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

  writeJson("downloads.json", {
    files: files.map((f) => ({
      title: f.title,
      desc: f.description || "",
      filename: f.filename || "",
      url: f.file_url || "",
      size: f.file_size || "",
      date: f.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
      downloads: f.download_count || 0,
    })),
  });
}

export function exportAll(): void {
  try { exportSite(); } catch (e) { console.error("[json-export] site:", e); }
  try { exportBanners(); } catch (e) { console.error("[json-export] banners:", e); }
  try { exportBrands(); } catch (e) { console.error("[json-export] brands:", e); }
  try { exportNotices(); } catch (e) { console.error("[json-export] notices:", e); }
  try { exportFaq(); } catch (e) { console.error("[json-export] faq:", e); }
  try { exportDownloads(); } catch (e) { console.error("[json-export] downloads:", e); }
}
