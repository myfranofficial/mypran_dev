/** Placeholder brand data — will be replaced by CMS/API later */

export type BrandTier = "best" | "premium" | "special";

export type Brand = {
  id: string;
  name: string;
  tier: BrandTier;
  category: string;
  logo?: string;
  storefront?: string;
  circle?: string;
  storeCount?: number;
};

export type OwnedBrand = {
  no: string;
  name: string;
  interior?: string;
};

/** Best brands shown on homepage (12 tiles) */
export const bestBrands: Brand[] = Array.from({ length: 12 }, (_, i) => ({
  id: `brand-${String(i + 1).padStart(2, "0")}`,
  name: `브랜드명 ${String(i + 1).padStart(2, "0")}`,
  tier: "best" as BrandTier,
  category: "외식",
}));

/** Owned brands shown on homepage (4 cards) */
export const ownedBrands: OwnedBrand[] = [
  { no: "01", name: "[보유 브랜드 1]" },
  { no: "02", name: "[보유 브랜드 2]" },
  { no: "03", name: "[보유 브랜드 3]" },
  { no: "04", name: "[보유 브랜드 4]" },
];

/** Stats for the stat bar */
export const stats = [
  { icon: "trophy", value: "100+", label: "입점 브랜드" },
  { icon: "people", value: "1,000+", label: "가맹 상담 진행" },
  { icon: "chart", value: "500+", label: "성공 창업 사례" },
  { icon: "shield", value: "98%", label: "고객 만족도" },
];

/** Benefit tiles for the red band */
export const benefits = [
  { icon: "speaker", title: "자사 홈페이지 광고비", accent: "매월 1억원 집행" },
  { icon: "book", title: "창업매거진 전국 배포", accent: "무료 게재" },
  { icon: "monitor", title: "신생 브랜드", subtitle: "홈페이지 제작" },
  { icon: "file", title: "카탈로그 제작" },
  { icon: "chart", title: "마케팅비 지원" },
  { icon: "people", title: "창업박람회", subtitle: "입점 대행" },
];

/** Pricing plans */
export const plans = [
  {
    tier: "best" as const,
    eyebrow: "RECOMMENDED",
    no: "01",
    name: "베스트 브랜드",
    desc: "메인 최상단 노출, 가장 먼저 보이는 자리",
    price: "1,000",
    featured: true,
    specs: [
      { label: "노출 위치", value: "메인 1단" },
      { label: "브랜드관 카드", value: "포함" },
      { label: "추천 브랜드 노출", value: "포함" },
    ],
  },
  {
    tier: "premium" as const,
    eyebrow: "PREMIUM",
    no: "02",
    name: "프리미엄 브랜드",
    desc: "검증된 업종별 브랜드 영역 노출",
    price: "700",
    featured: false,
    specs: [
      { label: "노출 위치", value: "메인 2단" },
      { label: "브랜드관 카드", value: "포함" },
      { label: "추천 브랜드 노출", value: "—" },
    ],
  },
  {
    tier: "special" as const,
    eyebrow: "SPECIAL",
    no: "03",
    name: "스페셜 브랜드",
    desc: "성장 가능성이 높은 생활밀착형 브랜드",
    price: "500",
    featured: false,
    specs: [
      { label: "노출 위치", value: "메인 3단" },
      { label: "브랜드관 카드", value: "포함" },
      { label: "추천 브랜드 노출", value: "—" },
    ],
  },
];

/** Hero service icons */
export const heroServices = [
  { icon: "people", label: "가맹영업대행" },
  { icon: "chart", label: "상권분석" },
  { icon: "home", label: "가맹본부 구축" },
  { icon: "monitor", label: "온라인 창업박람회" },
  { icon: "shield", label: "투자대행" },
];
