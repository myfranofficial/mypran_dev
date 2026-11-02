/**
 * Homepage data — all values are now read from homepage.json (admin-managed).
 * Re-exports from site-data.ts for backward compatibility with existing imports.
 */
import {
  readHomepageData,
  type HomeStat,
  type HomeBenefit,
  type HomePlan,
  type HeroService,
} from "@/lib/site-data";

export type OwnedBrand = {
  no: string;
  name: string;
  interior?: string;
};

/** Owned brands shown on homepage (4 cards) — 자사 브랜드 없으면 빈 배열 */
export const ownedBrands: OwnedBrand[] = [];

// These are now functions, but we read once at module level for SSR pages.
// Server components call readHomepageData() directly anyway.
const _hp = readHomepageData();

export const stats: HomeStat[] = _hp.stats;
export const benefits: HomeBenefit[] = _hp.benefits;
export const plans: HomePlan[] = _hp.plans;
export const heroServices: HeroService[] = _hp.heroServices;
