import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

// ── helpers ──

const DATA_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "data");

function readJson<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return fallback;
    return { ...fallback, ...JSON.parse(fs.readFileSync(filePath, "utf-8")) };
  } catch {
    return fallback;
  }
}

// ── Site (연락처·슬로건·SNS) ──

export type SiteData = {
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  hours: string;
  copyright: string;
  slogan: string;
  sloganSub: string;
  sloganEn: string;
  sns: { kakao: string; instagram: string; youtube: string; blog: string };
  terms: string;
  privacyPolicy: string;
};

const SITE_DEFAULTS: SiteData = {
  phone: "010-4708-6091",
  email: "myfriend2026@naver.com",
  address: "서울특별시 마포구 동교로22길 19, 청송빌딩 4층",
  addressDetail: "",
  hours: "평일 09:00 ~ 18:00",
  copyright: "Copyright © MYFRAN. All rights reserved.",
  slogan: "프랜차이즈 비교는 필수입니다",
  sloganSub: "함께 만드는 성공 스토리",
  sloganEn: "MyFran Premium Franchise",
  sns: { kakao: "", instagram: "", youtube: "", blog: "" },
  terms: "",
  privacyPolicy: "",
};

export function readSiteData(): SiteData {
  noStore();
  try {
    const filePath = path.join(DATA_DIR, "site.json");
    if (!fs.existsSync(filePath)) return SITE_DEFAULTS;
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return {
      phone: raw.phone || SITE_DEFAULTS.phone,
      email: raw.email || SITE_DEFAULTS.email,
      address: raw.address || SITE_DEFAULTS.address,
      addressDetail: raw.addressDetail || raw.addressSub || "",
      hours: raw.hours || SITE_DEFAULTS.hours,
      copyright: raw.copyright || SITE_DEFAULTS.copyright,
      slogan: raw.slogan || SITE_DEFAULTS.slogan,
      sloganSub: raw.sloganSub || SITE_DEFAULTS.sloganSub,
      sloganEn: raw.sloganEn || SITE_DEFAULTS.sloganEn,
      sns: { ...SITE_DEFAULTS.sns, ...(raw.sns || {}) },
      terms: raw.terms || "",
      privacyPolicy: raw.privacyPolicy || "",
    };
  } catch {
    return SITE_DEFAULTS;
  }
}

// ── Banners (히어로 배너) ──

export type BannerItem = {
  title: string;
  subtitle: string;
  image: string;
  imageMobile: string;
  link: string;
};

export function readBanners(): BannerItem[] {
  noStore();
  const data = readJson<{ banners: BannerItem[] }>("banners.json", { banners: [] });
  return data.banners;
}

// ── Homepage (통계·혜택·요금·서비스) ──

export type HomeStat = { icon: string; value: string; label: string };
export type HomeBenefit = { icon: string; title: string; accent?: string; subtitle?: string };
export type HomePlanSpec = { label: string; value: string };
export type HomePlan = {
  tier: string;
  eyebrow: string;
  no: string;
  name: string;
  desc: string;
  price: string;
  featured: boolean;
  specs: HomePlanSpec[];
};
export type HeroService = { icon: string; label: string };

export type HomepageData = {
  stats: HomeStat[];
  benefits: HomeBenefit[];
  plans: HomePlan[];
  heroServices: HeroService[];
};

const HOMEPAGE_DEFAULTS: HomepageData = {
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
};

export function readHomepageData(): HomepageData {
  noStore();
  const data = readJson<HomepageData>("homepage.json", HOMEPAGE_DEFAULTS);
  return {
    stats: data.stats?.length ? data.stats : HOMEPAGE_DEFAULTS.stats,
    benefits: data.benefits?.length ? data.benefits : HOMEPAGE_DEFAULTS.benefits,
    plans: data.plans?.length ? data.plans : HOMEPAGE_DEFAULTS.plans,
    heroServices: data.heroServices?.length ? data.heroServices : HOMEPAGE_DEFAULTS.heroServices,
  };
}

// ── Notices (공지사항) ──

export type NoticeItem = {
  id: number | string;
  category: string;
  title: string;
  content: string;
  date: string;
  isPinned?: boolean;
};

const NOTICES_DEFAULTS: NoticeItem[] = [
  { id: "n-001", title: "마이프랜 온라인 창업박람회 오픈 안내", content: "마이프랜 온라인 창업박람회가 공식 오픈하였습니다. 다양한 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청해 보세요.", date: "2026-10-15", category: "공지" },
  { id: "n-002", title: "10월 창업 컨설팅 무료 이벤트", content: "10월 한 달간 마이프랜을 통해 상담 신청하시는 모든 분께 무료 창업 컨설팅을 제공합니다.", date: "2026-10-10", category: "이벤트" },
  { id: "n-003", title: "신규 입점 브랜드 안내 — 메가커피, 교촌치킨 외 5개", content: "이번 달 새롭게 입점한 7개 브랜드를 소개합니다.", date: "2026-10-05", category: "공지" },
  { id: "n-004", title: "창업 성공 사례: 메가커피 강남점 이야기", content: "직장인에서 카페 사장님으로 전환한 메가커피 강남점 김OO 대표의 성공 스토리를 공유합니다.", date: "2026-09-28", category: "성공사례" },
  { id: "n-005", title: "마이프랜 홈페이지 리뉴얼 안내", content: "더 나은 서비스를 위해 마이프랜 홈페이지를 리뉴얼하였습니다.", date: "2026-09-20", category: "공지" },
];

export function readNotices(): NoticeItem[] {
  noStore();
  const data = readJson<{ notices: NoticeItem[] }>("news.json", { notices: [] });
  return data.notices?.length ? data.notices : NOTICES_DEFAULTS;
}

// ── Popups ──

export type PopupItem = {
  id: number;
  title: string;
  image: string;
  link: string;
  linkText: string;
  position: string;
};

export function readPopups(): PopupItem[] {
  noStore();
  const data = readJson<{ popups: PopupItem[] }>("popups.json", { popups: [] });
  return data.popups;
}

// ── FAQ ──

export type FaqItem = { category: string; question: string; answer: string };

export function readFaq(): { categories: string[]; items: FaqItem[] } {
  noStore();
  const data = readJson<{ categories: string[]; items: FaqItem[] }>("faq.json", {
    categories: ["전체"],
    items: [],
  });
  return data;
}

// ── Events ──

export type EventItem = {
  title: string;
  desc: string;
  image: string;
  startDate: string;
  endDate: string;
  status: string;
};

export function readEvents(): EventItem[] {
  noStore();
  const data = readJson<{ events: EventItem[] }>("events.json", { events: [] });
  return data.events;
}

// ── Gallery ──

export type GalleryImage = { title: string; branch: string; src: string };

export function readGallery(): { categories: string[]; images: GalleryImage[] } {
  noStore();
  return readJson("gallery.json", { categories: ["전체"], images: [] });
}

// ── Videos ──

export type VideoItem = {
  title: string;
  desc: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  date: string;
};

export function readVideos(): { categories: string[]; videos: VideoItem[] } {
  noStore();
  return readJson("videos.json", { categories: ["전체"], videos: [] });
}

// ── Downloads ──

export type DownloadItem = {
  title: string;
  desc: string;
  filename: string;
  fileUrl: string;
  size: string;
  date: string;
};

export function readDownloads(): DownloadItem[] {
  noStore();
  const data = readJson<{ files: DownloadItem[] }>("downloads.json", { files: [] });
  return data.files;
}

// ── Reviews ──

export type ReviewItem = { author: string; rating: number; content: string; date: string };

export function readReviews(): ReviewItem[] {
  noStore();
  const data = readJson<{ reviews: ReviewItem[] }>("reviews.json", { reviews: [] });
  return data.reviews;
}

// ── Listing Benefits (입점 혜택) ──

export type ListingBenefit = { title: string; desc: string };

const LISTING_BENEFITS_DEFAULTS: ListingBenefit[] = [
  { title: "자사 홈페이지 광고비", desc: "매월 1억원 규모의 온라인 마케팅 집행으로 브랜드 노출 극대화" },
  { title: "창업매거진 전국 배포", desc: "오프라인 매거진에 브랜드 무료 게재, 전국 예비 창업자에게 도달" },
  { title: "온라인 창업박람회", desc: "365일 운영되는 온라인 박람회에서 상시 브랜드 홍보" },
  { title: "1:1 창업 상담 연결", desc: "관심 고객을 직접 브랜드 본사에 연결해 상담률 극대화" },
  { title: "홈페이지 제작 지원", desc: "신생 브랜드를 위한 전문 홈페이지 제작 서비스 제공" },
  { title: "마케팅비 지원", desc: "입점 브랜드에 디지털 마케팅 비용 일부 지원" },
];

export function readListingBenefits(): ListingBenefit[] {
  noStore();
  const hp = readJson<{ listingBenefits?: ListingBenefit[] }>("homepage.json", {});
  return hp.listingBenefits?.length ? hp.listingBenefits : LISTING_BENEFITS_DEFAULTS;
}
