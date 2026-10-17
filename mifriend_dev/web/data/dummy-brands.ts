/** 더미 데이터 — 어드민 DB 연동 전까지 사용 */

/* ── 타입 정의 ── */
export type BrandCategory = {
  id: string;
  name: string;
  slug: string;
};

export type DummyBrand = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  tagline: string;
  description: string;
  foundingCost: string;
  storeCount: number;
  features: string[];
  phone: string;
  logo?: string;
  mainImage?: string;
  images?: string[];
  isFeatured: boolean;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
};

/* ── 카테고리 ── */
export const categories: BrandCategory[] = [
  { id: "all", name: "전체", slug: "all" },
  { id: "cafe", name: "카페·디저트", slug: "cafe" },
  { id: "chicken", name: "치킨·피자", slug: "chicken" },
  { id: "food", name: "외식·한식", slug: "food" },
  { id: "pub", name: "주점·술집", slug: "pub" },
  { id: "retail", name: "편의·리테일", slug: "retail" },
  { id: "service", name: "서비스·교육", slug: "service" },
];

/* ── 브랜드 ── */
const brandData: Omit<DummyBrand, "id">[] = [
  { name: "달콤커피", categoryId: "cafe", categoryName: "카페·디저트", tagline: "합리적인 가격의 스페셜티 커피", description: "달콤커피는 스페셜티 원두를 합리적인 가격에 제공하는 카페 프랜차이즈입니다. 소자본 창업이 가능하며, 본사의 체계적인 교육 시스템을 통해 커피 전문가가 아니어도 쉽게 운영할 수 있습니다.", foundingCost: "3,000만원~5,000만원", storeCount: 230, features: ["소자본 창업 가능", "체계적 교육 시스템", "본사 원두 직배송", "SNS 마케팅 지원"], phone: "010-4708-6091", isFeatured: true },
  { name: "버블링 밀크티", categoryId: "cafe", categoryName: "카페·디저트", tagline: "프리미엄 밀크티 전문점", description: "대만식 정통 밀크티와 버블티를 전문으로 하는 디저트 카페입니다. 독자적인 레시피와 자체 개발 토핑으로 차별화된 맛을 제공합니다.", foundingCost: "2,500만원~4,000만원", storeCount: 145, features: ["독자적 레시피", "자체 개발 토핑", "소규모 매장 가능", "배달 특화 메뉴"], phone: "010-4708-6091", isFeatured: true },
  { name: "치킨 마스터", categoryId: "chicken", categoryName: "치킨·피자", tagline: "숯불 직화 치킨의 정석", description: "숯불 직화 방식의 프리미엄 치킨 브랜드입니다. 특허 받은 양념 기술과 신선한 국내산 닭만을 사용합니다.", foundingCost: "4,000만원~6,000만원", storeCount: 310, features: ["특허 양념 기술", "국내산 닭 100%", "배달·포장·홀 겸업", "물류 시스템 완비"], phone: "010-4708-6091", isFeatured: true },
  { name: "피자 드림", categoryId: "chicken", categoryName: "치킨·피자", tagline: "화덕 피자의 새로운 기준", description: "정통 이탈리안 화덕 피자를 합리적인 가격에 즐길 수 있는 프랜차이즈입니다. 수제 도우와 프리미엄 치즈를 사용합니다.", foundingCost: "5,000만원~7,000만원", storeCount: 180, features: ["정통 화덕 피자", "수제 도우", "프리미엄 치즈", "사이드 메뉴 다양"], phone: "010-4708-6091", isFeatured: false },
  { name: "한솥 정식", categoryId: "food", categoryName: "외식·한식", tagline: "정갈한 한 끼, 한솥에 담다", description: "1인 가구와 직장인을 위한 합리적인 가격의 한식 정식 프랜차이즈입니다. 매일 신선한 재료로 정갈한 한 끼를 제공합니다.", foundingCost: "3,500만원~5,500만원", storeCount: 420, features: ["합리적 가격대", "매일 신선 식재료", "빠른 조리 시스템", "테이크아웃 가능"], phone: "010-4708-6091", isFeatured: true },
  { name: "육회 바른", categoryId: "food", categoryName: "외식·한식", tagline: "신선한 육회의 모든 것", description: "HACCP 인증 시설에서 가공한 신선한 육회를 전문으로 하는 프랜차이즈입니다. 간편한 운영과 높은 수익성이 특징입니다.", foundingCost: "4,500만원~6,500만원", storeCount: 95, features: ["HACCP 인증", "간편 운영 시스템", "높은 마진율", "야간 영업 특화"], phone: "010-4708-6091", isFeatured: false },
  { name: "술한잔", categoryId: "pub", categoryName: "주점·술집", tagline: "감성 포차의 새 트렌드", description: "2030 세대를 타겟으로 한 감성 포차 프랜차이즈입니다. 트렌디한 인테리어와 퓨전 안주로 젊은 층에게 큰 인기를 얻고 있습니다.", foundingCost: "6,000만원~8,000만원", storeCount: 160, features: ["트렌디한 인테리어", "퓨전 안주 메뉴", "높은 테이블 회전율", "SNS 바이럴 효과"], phone: "010-4708-6091", isFeatured: true },
  { name: "포차 야시장", categoryId: "pub", categoryName: "주점·술집", tagline: "대만 야시장 콘셉트 주점", description: "대만 야시장을 콘셉트로 한 이색 주점입니다. 독특한 분위기와 다양한 길거리 음식 스타일 안주를 제공합니다.", foundingCost: "5,500만원~7,500만원", storeCount: 85, features: ["이색 콘셉트", "길거리 음식 안주", "포토존 마케팅", "단체석 운영"], phone: "010-4708-6091", isFeatured: false },
  { name: "편의마트 24", categoryId: "retail", categoryName: "편의·리테일", tagline: "동네 편의점의 새로운 얼굴", description: "지역 밀착형 편의점 프랜차이즈입니다. 본사의 강력한 물류 시스템과 차별화된 PB 상품으로 경쟁력을 갖추고 있습니다.", foundingCost: "7,000만원~1억원", storeCount: 550, features: ["24시간 운영", "강력한 물류망", "PB 상품 라인업", "무인 결제 시스템"], phone: "010-4708-6091", isFeatured: true },
  { name: "세탁 플러스", categoryId: "retail", categoryName: "편의·리테일", tagline: "무인 세탁의 선두주자", description: "무인 코인 세탁소 프랜차이즈입니다. 최소 인건비로 운영 가능하며, 부업으로도 적합한 비즈니스 모델입니다.", foundingCost: "3,000만원~5,000만원", storeCount: 780, features: ["무인 운영", "최소 인건비", "부업 가능", "IoT 원격 관리"], phone: "010-4708-6091", isFeatured: false },
  { name: "키즈 아카데미", categoryId: "service", categoryName: "서비스·교육", tagline: "아이의 미래를 설계하다", description: "유아·초등 대상 종합 교육 프랜차이즈입니다. 코딩, 영어, 수학 등 다양한 교과목을 원스톱으로 제공합니다.", foundingCost: "5,000만원~8,000만원", storeCount: 120, features: ["종합 교육 커리큘럼", "소규모 학원 가능", "학부모 만족도 1위", "온라인 병행 수업"], phone: "010-4708-6091", isFeatured: true },
  { name: "헬스 포인트", categoryId: "service", categoryName: "서비스·교육", tagline: "24시간 무인 피트니스", description: "24시간 무인 피트니스 프랜차이즈입니다. 최소 인력으로 운영 가능하며, 회원 관리 앱을 통한 체계적 관리가 가능합니다.", foundingCost: "8,000만원~1.5억원", storeCount: 65, features: ["24시간 무인 운영", "회원 관리 앱", "최신 운동 기구", "PT 프로그램 옵션"], phone: "010-4708-6091", isFeatured: false },
  { name: "빵공장", categoryId: "cafe", categoryName: "카페·디저트", tagline: "갓 구운 빵의 행복", description: "매장에서 직접 굽는 프리미엄 베이커리 프랜차이즈입니다. 천연 발효종을 사용한 건강한 빵을 제공합니다.", foundingCost: "6,000만원~9,000만원", storeCount: 95, features: ["매장 직접 제빵", "천연 발효종 사용", "시즌 한정 메뉴", "카페 겸업 가능"], phone: "010-4708-6091", isFeatured: false },
  { name: "국밥 한그릇", categoryId: "food", categoryName: "외식·한식", tagline: "든든한 한 끼의 대명사", description: "전통 방식의 국밥을 현대적으로 재해석한 프랜차이즈입니다. 간편한 조리 시스템으로 인건비를 절감할 수 있습니다.", foundingCost: "3,000만원~5,000만원", storeCount: 200, features: ["간편 조리 시스템", "저렴한 식재료 원가", "높은 회전율", "배달 매출 병행"], phone: "010-4708-6091", isFeatured: false },
  { name: "닭갈비 천국", categoryId: "food", categoryName: "외식·한식", tagline: "춘천식 정통 닭갈비", description: "춘천식 정통 닭갈비를 재현한 프랜차이즈입니다. 자체 개발 양념과 신선한 국내산 닭으로 차별화된 맛을 제공합니다.", foundingCost: "4,000만원~6,000만원", storeCount: 110, features: ["자체 개발 양념", "국내산 닭 사용", "단체 회식 특화", "볶음밥 마무리"], phone: "010-4708-6091", isFeatured: false },
  { name: "떡볶이 스타", categoryId: "food", categoryName: "외식·한식", tagline: "분식계의 떠오르는 별", description: "프리미엄 떡볶이 전문점입니다. 다양한 맛의 떡볶이와 튀김, 순대 등을 함께 즐길 수 있는 분식 프랜차이즈입니다.", foundingCost: "2,000만원~3,500만원", storeCount: 340, features: ["소자본 창업", "다양한 맛 라인업", "테이크아웃 특화", "배달앱 상위 노출"], phone: "010-4708-6091", isFeatured: true },
  { name: "와인 비스트로", categoryId: "pub", categoryName: "주점·술집", tagline: "일상 속 와인 한 잔", description: "합리적인 가격의 와인과 양식 안주를 즐길 수 있는 비스트로 프랜차이즈입니다. 세련된 인테리어가 특징입니다.", foundingCost: "7,000만원~1억원", storeCount: 45, features: ["합리적 와인 가격", "양식 안주", "데이트 코스 특화", "와인 교육 지원"], phone: "010-4708-6091", isFeatured: false },
  { name: "코인 워시", categoryId: "retail", categoryName: "편의·리테일", tagline: "스마트한 세탁 솔루션", description: "최신 IoT 기술을 접목한 무인 세탁소 프랜차이즈입니다. 스마트폰 앱으로 원격 관리가 가능합니다.", foundingCost: "4,000만원~6,000만원", storeCount: 320, features: ["IoT 스마트 관리", "앱 원격 모니터링", "친환경 세제", "무인 24시간"], phone: "010-4708-6091", isFeatured: false },
  { name: "수학 교습소", categoryId: "service", categoryName: "서비스·교육", tagline: "1:1 맞춤 수학 교육", description: "AI 기반 맞춤 학습 시스템을 도입한 수학 교습소 프랜차이즈입니다. 학생 개인별 취약점을 분석하여 맞춤 교육을 제공합니다.", foundingCost: "2,000만원~4,000만원", storeCount: 180, features: ["AI 맞춤 학습", "1:1 개인 교육", "학부모 리포트", "온라인 병행"], phone: "010-4708-6091", isFeatured: false },
  { name: "핫도그 팩토리", categoryId: "food", categoryName: "외식·한식", tagline: "수제 핫도그의 명가", description: "수제 핫도그와 감자 스틱을 전문으로 하는 간식 프랜차이즈입니다. 테이크아웃과 배달에 최적화된 운영 모델입니다.", foundingCost: "1,500만원~3,000만원", storeCount: 260, features: ["초소자본 창업", "간단한 조리", "테이크아웃 특화", "학교 앞 상권"], phone: "010-4708-6091", isFeatured: false },
];

export const dummyBrands: DummyBrand[] = brandData.map((b, i) => ({
  id: `brand-${String(i + 1).padStart(3, "0")}`,
  ...b,
}));

/* ── 공지사항 ── */
export const dummyNotices: Notice[] = [
  { id: "n-001", title: "마이프랜 온라인 창업박람회 오픈 안내", content: "마이프랜 온라인 창업박람회가 공식 오픈하였습니다. 다양한 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청해 보세요. 매월 다양한 이벤트와 혜택이 준비되어 있습니다.", date: "2026-10-15", category: "공지" },
  { id: "n-002", title: "10월 창업 컨설팅 무료 이벤트", content: "10월 한 달간 마이프랜을 통해 상담 신청하시는 모든 분께 무료 창업 컨설팅을 제공합니다. 전문 컨설턴트가 상권 분석부터 브랜드 선정까지 1:1로 도와드립니다.", date: "2026-10-10", category: "이벤트" },
  { id: "n-003", title: "신규 입점 브랜드 안내 — 달콤커피, 치킨마스터 외 5개", content: "이번 달 새롭게 입점한 7개 브랜드를 소개합니다. 카페, 치킨, 한식 등 다양한 업종의 검증된 브랜드가 추가되었습니다.", date: "2026-10-05", category: "공지" },
  { id: "n-004", title: "창업 성공 사례: 달콤커피 강남점 이야기", content: "직장인에서 카페 사장님으로 전환한 달콤커피 강남점 김OO 대표의 성공 스토리를 공유합니다. 창업 준비부터 오픈, 안정화까지의 과정을 상세히 담았습니다.", date: "2026-09-28", category: "성공사례" },
  { id: "n-005", title: "마이프랜 홈페이지 리뉴얼 안내", content: "더 나은 서비스를 위해 마이프랜 홈페이지를 리뉴얼하였습니다. 브랜드 비교 기능이 강화되었으며, 모바일 환경에서도 편리하게 이용하실 수 있습니다.", date: "2026-09-20", category: "공지" },
];
