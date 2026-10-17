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

/** Best brands shown on homepage (12 tiles) — 상하좌우 이미지 겹치지 않게 배치 */
/*
  6열(PC) 배치:
  Row 0: 메가커피 | 교촌치킨 | GS25    | 브레드마루  | 롯데리아   | 빽다방
  Row 1: 치맥피플 | 파리바게뜨 | 강여사불백집 | CU       | 더헤어    | 보울스토리
*/
export const bestBrands: Brand[] = [
  { id: "b-01", name: "메가커피",       tier: "best", category: "카페·디저트", storefront: "/brands/mega-coffee.png" },
  { id: "b-02", name: "교촌치킨",       tier: "best", category: "치킨·피자",   storefront: "/brands/kyochon.png" },
  { id: "b-03", name: "GS25",          tier: "best", category: "편의·리테일", storefront: "/brands/gs25.png" },
  { id: "b-04", name: "브레드마루",     tier: "best", category: "카페·디저트", storefront: "/brands/bread-maru.png" },
  { id: "b-05", name: "롯데리아",       tier: "best", category: "외식·한식",   storefront: "/brands/lotteria.png" },
  { id: "b-06", name: "빽다방",         tier: "best", category: "카페·디저트", storefront: "/brands/paik-coffee.png" },
  { id: "b-07", name: "치맥피플",       tier: "best", category: "주점·술집",   storefront: "/brands/chimac-people.png" },
  { id: "b-08", name: "파리바게뜨",     tier: "best", category: "카페·디저트", storefront: "/brands/paris-baguette.png" },
  { id: "b-09", name: "강여사의 불백집", tier: "best", category: "외식·한식",  storefront: "/brands/bulbaek.png" },
  { id: "b-10", name: "CU",            tier: "best", category: "편의·리테일", storefront: "/brands/cu.png" },
  { id: "b-11", name: "더헤어",         tier: "best", category: "서비스·교육", storefront: "/brands/the-hair.png" },
  { id: "b-12", name: "보울스토리",     tier: "best", category: "외식·한식",   storefront: "/brands/bowl-story.jpg" },
];

/** Owned brands shown on homepage (4 cards) */
export const ownedBrands: OwnedBrand[] = [
  { no: "01", name: "HiQ 빌리어드", interior: "/brands/hiq-billiards.jpg" },
  { no: "02", name: "메가커피 프리미엄", interior: "/brands/mega-coffee-premium.png" },
  { no: "03", name: "오늘토스트", interior: "/brands/today-toast.jpg" },
  { no: "04", name: "비어플래닛", interior: "/brands/beer-planet.jpg" },
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
