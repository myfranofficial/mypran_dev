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

/** Best brands shown on homepage (14 tiles) */
export const bestBrands: Brand[] = [
  { id: "b-01", name: "핵밥",            tier: "best", category: "외식·한식",   storefront: "/brands/hecbob.jpg" },
  { id: "b-02", name: "선비꼬마김밥",     tier: "best", category: "분식",       storefront: "/brands/sunbi-kimbap.jpg" },
  { id: "b-03", name: "요거트월드",       tier: "best", category: "카페·디저트", storefront: "/brands/yogurt-world.jpg" },
  { id: "b-04", name: "스텔라떡볶이",     tier: "best", category: "분식",       storefront: "/brands/stella-tteokbokki.jpg" },
  { id: "b-05", name: "프랭크커핀바",     tier: "best", category: "카페·디저트", storefront: "/brands/frank-coffin-bar.jpg" },
  { id: "b-06", name: "솔삼조",          tier: "best", category: "외식·한식",   storefront: "/brands/solsamjo.jpg" },
  { id: "b-07", name: "그릭데이",         tier: "best", category: "카페·디저트", storefront: "/brands/greek-day.jpg" },
  { id: "b-08", name: "제이델링",         tier: "best", category: "카페·디저트", storefront: "/brands/jdeling.jpg" },
  { id: "b-09", name: "스트릿팬케이크카페", tier: "best", category: "카페·디저트", storefront: "/brands/street-pancake.jpg" },
  { id: "b-10", name: "천라쿵푸 마라탕",   tier: "best", category: "외식·한식",  storefront: "/brands/chunra-kungfu.jpg" },
  { id: "b-11", name: "아담만두",         tier: "best", category: "분식",       storefront: "/brands/adam-mandu.jpg" },
  { id: "b-12", name: "덮밥장사장",       tier: "best", category: "외식·한식",   storefront: "/brands/deopbap-sajang.jpg" },
  { id: "b-13", name: "덕수파스타",       tier: "best", category: "외식·한식",   storefront: "/brands/deoksu-pasta.jpg" },
  { id: "b-14", name: "왓더버거",         tier: "best", category: "외식·한식",   storefront: "/brands/what-the-burger.jpg" },
];

/** Owned brands shown on homepage (4 cards) — 자사 브랜드 없으면 빈 배열 */
export const ownedBrands: OwnedBrand[] = [];

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
