export type BrandCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BudgetRange = {
  id: string;
  label: string;
  min: number; // 만원
  max: number; // 만원 (99999 = 이상)
};

export type StoreType = {
  id: string;
  name: string;
};

/* ── 업종 카테고리 (9개, 설명서 기준) ── */
export const categories: BrandCategory[] = [
  { id: "all", name: "전체", slug: "all" },
  { id: "korean", name: "한식", slug: "korean" },
  { id: "meat", name: "고기·곱창", slug: "meat" },
  { id: "chicken", name: "치킨", slug: "chicken" },
  { id: "snack", name: "분식", slug: "snack" },
  { id: "cafe", name: "카페", slug: "cafe" },
  { id: "pub", name: "주점", slug: "pub" },
  { id: "mealkit", name: "밀키트", slug: "mealkit" },
  { id: "billiard", name: "당구장", slug: "billiard" },
  { id: "etc", name: "기타", slug: "etc" },
];

/* ── 예산 구간 ── */
export const budgetRanges: BudgetRange[] = [
  { id: "under5000", label: "5천만원 이하", min: 0, max: 5000 },
  { id: "5000to1e", label: "5천만~1억원", min: 5000, max: 10000 },
  { id: "1eto2e", label: "1억~2억원", min: 10000, max: 20000 },
  { id: "over2e", label: "2억원 이상", min: 20000, max: 99999 },
];

/* ── 매장 형태 ── */
export const storeTypes: StoreType[] = [
  { id: "hall", name: "홀 매장" },
  { id: "delivery", name: "배달 전문" },
  { id: "unmanned", name: "무인 매장" },
  { id: "shopinshop", name: "샵인샵" },
  { id: "convert", name: "업종 변경" },
];

/* ── 공지사항 ── */
export type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
};

export const dummyNotices: Notice[] = [
  { id: "n-001", title: "마이프랜 온라인 창업박람회 오픈 안내", content: "마이프랜 온라인 창업박람회가 공식 오픈하였습니다. 다양한 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청해 보세요. 매월 다양한 이벤트와 혜택이 준비되어 있습니다.", date: "2026-10-15", category: "공지" },
  { id: "n-002", title: "10월 창업 컨설팅 무료 이벤트", content: "10월 한 달간 마이프랜을 통해 상담 신청하시는 모든 분께 무료 창업 컨설팅을 제공합니다. 전문 컨설턴트가 상권 분석부터 브랜드 선정까지 1:1로 도와드립니다.", date: "2026-10-10", category: "이벤트" },
  { id: "n-003", title: "신규 입점 브랜드 안내 — 메가커피, 교촌치킨 외 5개", content: "이번 달 새롭게 입점한 7개 브랜드를 소개합니다. 카페, 치킨, 한식 등 다양한 업종의 검증된 브랜드가 추가되었습니다.", date: "2026-10-05", category: "공지" },
  { id: "n-004", title: "창업 성공 사례: 메가커피 강남점 이야기", content: "직장인에서 카페 사장님으로 전환한 메가커피 강남점 김OO 대표의 성공 스토리를 공유합니다. 창업 준비부터 오픈, 안정화까지의 과정을 상세히 담았습니다.", date: "2026-09-28", category: "성공사례" },
  { id: "n-005", title: "마이프랜 홈페이지 리뉴얼 안내", content: "더 나은 서비스를 위해 마이프랜 홈페이지를 리뉴얼하였습니다. 브랜드 비교 기능이 강화되었으며, 모바일 환경에서도 편리하게 이용하실 수 있습니다.", date: "2026-09-20", category: "공지" },
];
