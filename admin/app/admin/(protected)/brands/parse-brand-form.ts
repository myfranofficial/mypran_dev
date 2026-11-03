import type { BrandInput } from "@/lib/db/brands";

/** FormData → BrandInput 변환 (new / edit 공용) */
export function parseBrandForm(formData: FormData): BrandInput {
  const str = (key: string) => String(formData.get(key) ?? "").trim();
  const num = (key: string, def = 0) => { const v = str(key); return v ? Number(v) : def; };
  const jsonLines = (key: string) => {
    const raw = str(key);
    const arr = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    return arr.length ? JSON.stringify(arr) : null;
  };

  // cost_breakdown: "항목: 금액" → [{label, value}]
  const cbRaw = str("cost_breakdown_raw");
  let costBreakdown: string | null = null;
  if (cbRaw) {
    const items = cbRaw.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: line, value: "" };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
    if (items.length) costBreakdown = JSON.stringify(items);
  }

  return {
    category_id: str("category_id") ? Number(str("category_id")) : null,
    name: str("name"),
    tier: str("tier") || "special",
    tagline: str("tagline") || null,
    description: str("description") || null,
    founding_cost: str("founding_cost") || null,
    founding_cost_min: num("founding_cost_min"),
    listing_fee: num("listing_fee"),
    store_count: num("store_count"),
    store_type: str("store_type") || "hall",
    logo_url: str("logo_url") || null,
    main_image_url: str("main_image_url") || null,
    images: jsonLines("images_raw"),
    features: jsonLines("features"),
    cost_breakdown: costBreakdown,
    franchise_fee: str("franchise_fee") || null,
    education_fee: str("education_fee") || null,
    royalty: str("royalty") || null,
    standard_area: str("standard_area") || null,
    vat_included: formData.get("vat_included") ? 1 : 0,
    deposit_included: formData.get("deposit_included") ? 1 : 0,
    startup_process: jsonLines("startup_process_raw"),
    headquarters: jsonLines("headquarters_raw"),
    phone: str("phone") || null,
    kakao_url: str("kakao_url") || null,
    is_featured: formData.get("is_featured") ? 1 : 0,
    is_active: formData.get("is_active") ? 1 : 0,
  };
}
