/** 더미 데이터 — 어드민 DB 연동 전까지 사용 */

/* ── 타입 정의 ── */
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

export type CostBreakdown = {
  label: string;
  value: string;
};

export type DummyBrand = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  tagline: string;
  description: string;
  foundingCost: string;
  foundingCostMin: number; // 만원
  storeCount: number;
  storeType: string; // StoreType id
  features: string[];
  phone: string;
  logo?: string;
  mainImage?: string;
  images?: string[];
  isFeatured: boolean;
  // 상세 비용
  costBreakdown: CostBreakdown[];
  franchiseFee: string;
  educationFee: string;
  royalty: string;
  standardArea: string; // 기준 평수
  vatIncluded: boolean;
  depositIncluded: boolean;
  // 창업 절차
  startupProcess: string[];
  // 본사 지원
  headquarters: string[];
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
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

/* ── 공통 창업 절차 ── */
const COMMON_PROCESS = [
  "가맹 문의 및 상담",
  "사업 설명회 참석",
  "가맹 계약 체결",
  "상권 분석 및 입지 선정",
  "인테리어 설계·시공",
  "본사 교육 이수",
  "오픈 준비 및 시운영",
  "정식 오픈",
];

/* ── 브랜드 데이터 ── */
const brandData: Omit<DummyBrand, "id">[] = [
  // Row 0
  {
    name: "메가커피", categoryId: "cafe", categoryName: "카페", tagline: "크게 즐기는 커피의 행복",
    description: "메가커피는 빅사이즈 2샷을 기본으로 합리적인 가격에 프리미엄 커피를 제공하는 대한민국 대표 커피 프랜차이즈입니다. 전국 3,000개 이상의 매장을 운영하며, 체계적인 물류 시스템과 교육 프로그램으로 안정적인 창업을 지원합니다.",
    foundingCost: "5,000만원~8,000만원", foundingCostMin: 5000, storeCount: 3200, storeType: "hall",
    features: ["빅사이즈 2샷 기본", "합리적 가격대", "전국 물류 시스템", "체계적 교육 프로그램"],
    phone: "010-4708-6091", mainImage: "/brands/mega-coffee.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "500만원" }, { label: "교육비", value: "200만원" },
      { label: "인테리어", value: "2,500만원~" }, { label: "장비·집기", value: "1,500만원~" },
      { label: "초도 물량", value: "300만원~" }, { label: "기타 비용", value: "500만원~" },
    ],
    franchiseFee: "500만원", educationFee: "200만원", royalty: "월 25만원",
    standardArea: "15~20평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["전용 원두 직배송", "SNS/온라인 마케팅 지원", "매장 운영 컨설팅", "시즌 신메뉴 개발"],
  },
  {
    name: "롯데리아", categoryId: "korean", categoryName: "한식", tagline: "언제나 맛있는 즐거움",
    description: "대한민국 대표 버거 브랜드 롯데리아. 한국인의 입맛에 맞춘 메뉴 개발과 전국 1,300여 개 매장 네트워크로 안정적인 프랜차이즈 운영이 가능합니다.",
    foundingCost: "1억원~2억원", foundingCostMin: 10000, storeCount: 1350, storeType: "hall",
    features: ["대한민국 대표 버거", "한국형 메뉴 개발", "전국 매장 네트워크", "본사 물류 지원"],
    phone: "010-4708-6091", mainImage: "/brands/lotteria.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "3,000만원" }, { label: "교육비", value: "별도 협의" },
      { label: "인테리어", value: "5,000만원~" }, { label: "장비·집기", value: "3,000만원~" },
      { label: "초도 물량", value: "500만원~" }, { label: "보증금", value: "1,000만원" },
    ],
    franchiseFee: "3,000만원", educationFee: "별도 협의", royalty: "매출의 3%",
    standardArea: "30~40평", vatIncluded: true, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["전국 물류 배송", "TV/디지털 마케팅", "매장 운영 매뉴얼", "정기 슈퍼바이징"],
  },
  {
    name: "브레드마루", categoryId: "cafe", categoryName: "카페", tagline: "갓 구운 빵이 있는 행복한 하루",
    description: "프리미엄 베이커리 카페 브레드마루. 매장에서 직접 굽는 신선한 빵과 커피를 함께 즐길 수 있으며, 좋은 재료로 만드는 건강한 빵을 추구합니다.",
    foundingCost: "6,000만원~1억원", foundingCostMin: 6000, storeCount: 280, storeType: "hall",
    features: ["매장 직접 제빵", "프리미엄 원재료", "카페 겸업 운영", "시즌 한정 메뉴"],
    phone: "010-4708-6091", mainImage: "/brands/bread-maru.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "1,000만원" }, { label: "교육비", value: "300만원" },
      { label: "인테리어", value: "3,000만원~" }, { label: "장비·집기(오븐 등)", value: "2,000만원~" },
      { label: "초도 물량", value: "500만원~" }, { label: "기타", value: "200만원~" },
    ],
    franchiseFee: "1,000만원", educationFee: "300만원", royalty: "월 30만원",
    standardArea: "20~30평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["제빵 기술 교육", "본사 레시피 제공", "시즌 메뉴 개발", "인테리어 설계 지원"],
  },
  {
    name: "GS25", categoryId: "etc", categoryName: "기타", tagline: "일상 속 행복을 더하는 편의점",
    description: "GS리테일이 운영하는 대한민국 대표 편의점 GS25. Lifestyle Platform으로서 다양한 먹거리와 생활 서비스를 제공하며, 강력한 물류 시스템이 특징입니다.",
    foundingCost: "1억원~1.5억원", foundingCostMin: 10000, storeCount: 17200, storeType: "hall",
    features: ["24시간 운영", "GS리테일 물류망", "PB 상품 경쟁력", "모바일 결제 시스템"],
    phone: "010-4708-6091", mainImage: "/brands/gs25.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "별도 협의" }, { label: "인테리어", value: "5,000만원~" },
      { label: "장비·집기", value: "3,000만원~" }, { label: "초도 물량", value: "2,000만원~" },
      { label: "보증금", value: "별도 협의" },
    ],
    franchiseFee: "별도 협의", educationFee: "무료", royalty: "매출 연동",
    standardArea: "20~30평", vatIncluded: true, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["전국 물류 시스템", "POS 시스템 제공", "24시간 고객센터", "매장 운영 교육"],
  },
  // Row 1
  {
    name: "교촌치킨", categoryId: "chicken", categoryName: "치킨", tagline: "정직한 맛이 만드는 행복 시간",
    description: "1991년부터 이어온 교촌치킨의 정직한 맛. 특제 간장 소스와 국내산 닭을 사용한 프리미엄 치킨 프랜차이즈입니다.",
    foundingCost: "8,000만원~1.2억원", foundingCostMin: 8000, storeCount: 1400, storeType: "hall",
    features: ["1991년 전통", "특제 간장 소스", "국내산 닭 사용", "배달·포장·홀 겸업"],
    phone: "010-4708-6091", mainImage: "/brands/kyochon.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "1,500만원" }, { label: "교육비", value: "300만원" },
      { label: "인테리어", value: "3,500만원~" }, { label: "장비·집기", value: "2,000만원~" },
      { label: "초도 물량", value: "500만원~" }, { label: "보증금", value: "300만원" },
    ],
    franchiseFee: "1,500만원", educationFee: "300만원", royalty: "월 35만원",
    standardArea: "15~25평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["국내산 닭 직배송", "마케팅 지원", "슈퍼바이저 정기 방문", "배달앱 관리 지원"],
  },
  {
    name: "CU", categoryId: "etc", categoryName: "기타", tagline: "언제나 가까운 행복",
    description: "BGF리테일이 운영하는 대한민국 1위 편의점 CU. 전국 17,000개 이상의 매장을 보유하고 있습니다.",
    foundingCost: "1억원~1.5억원", foundingCostMin: 10000, storeCount: 17500, storeType: "hall",
    features: ["전국 1위 매장 수", "BGF리테일 물류", "Fresh & Tasty", "무인 결제 도입"],
    phone: "010-4708-6091", mainImage: "/brands/cu.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "별도 협의" }, { label: "인테리어", value: "5,000만원~" },
      { label: "장비·집기", value: "3,000만원~" }, { label: "초도 물량", value: "2,000만원~" },
    ],
    franchiseFee: "별도 협의", educationFee: "무료", royalty: "매출 연동",
    standardArea: "20~30평", vatIncluded: true, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["전국 물류 시스템", "POS 시스템 제공", "24시간 고객센터", "매장 운영 교육"],
  },
  {
    name: "강여사의 불백집", categoryId: "korean", categoryName: "한식", tagline: "불맛 가득한, 행복한 한 상",
    description: "정성으로 만드는 한 끼의 행복. 프리미엄 불백을 합리적인 가격에 제공하는 한식 프랜차이즈입니다.",
    foundingCost: "4,000만원~6,000만원", foundingCostMin: 4000, storeCount: 350, storeType: "hall",
    features: ["프리미엄 불백 전문", "자체 개발 양념", "간편 조리 시스템", "높은 회전율"],
    phone: "010-4708-6091", mainImage: "/brands/bulbaek.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "500만원" }, { label: "교육비", value: "200만원" },
      { label: "인테리어", value: "2,000만원~" }, { label: "장비·집기", value: "1,000만원~" },
      { label: "초도 물량", value: "300만원~" },
    ],
    franchiseFee: "500만원", educationFee: "200만원", royalty: "월 20만원",
    standardArea: "15~20평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["자체 양념 소스 공급", "메뉴 레시피 교육", "매장 운영 컨설팅", "배달 플랫폼 연동"],
  },
  {
    name: "빽다방", categoryId: "cafe", categoryName: "카페", tagline: "가성비 좋은 맛있는 커피",
    description: "빽종원의 빽다방. 합리적인 가격에 맛있는 커피와 음료를 제공하는 국민 카페 프랜차이즈입니다.",
    foundingCost: "3,000만원~5,000만원", foundingCostMin: 3000, storeCount: 1600, storeType: "hall",
    features: ["빽종원 브랜드", "합리적 가격대", "소자본 창업", "높은 인지도"],
    phone: "010-4708-6091", mainImage: "/brands/paik-coffee.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "300만원" }, { label: "교육비", value: "150만원" },
      { label: "인테리어", value: "1,500만원~" }, { label: "장비·집기", value: "800만원~" },
      { label: "초도 물량", value: "250만원~" },
    ],
    franchiseFee: "300만원", educationFee: "150만원", royalty: "월 20만원",
    standardArea: "10~15평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["원두 및 원재료 공급", "SNS 마케팅 지원", "매장 운영 매뉴얼", "정기 품질 관리"],
  },
  // Row 2
  {
    name: "치맥피플", categoryId: "pub", categoryName: "주점", tagline: "치맥이 사람을 행복하게 한다",
    description: "Good Chicken, Good Beer, Better Life. 바삭한 프라이드 치킨과 시원한 생맥주를 함께 즐기는 치킨&비어 펍입니다.",
    foundingCost: "6,000만원~9,000만원", foundingCostMin: 6000, storeCount: 180, storeType: "hall",
    features: ["프라이드치킨 전문", "생맥주 시스템", "트렌디한 인테리어", "야간 매출 특화"],
    phone: "010-4708-6091", mainImage: "/brands/chimac-people.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "1,000만원" }, { label: "교육비", value: "200만원" },
      { label: "인테리어", value: "3,000만원~" }, { label: "장비·집기", value: "1,500만원~" },
      { label: "초도 물량", value: "300만원~" },
    ],
    franchiseFee: "1,000만원", educationFee: "200만원", royalty: "월 30만원",
    standardArea: "20~30평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["생맥주 시스템 설치", "치킨 조리 교육", "인테리어 설계", "배달/홀 운영 컨설팅"],
  },
  {
    name: "파리바게뜨", categoryId: "cafe", categoryName: "카페", tagline: "Fresh Bread, Happy Moments",
    description: "SPC그룹의 대표 베이커리 브랜드. 전국 3,400개 이상의 매장을 운영하는 대한민국 No.1 베이커리 카페입니다.",
    foundingCost: "1.5억원~3억원", foundingCostMin: 15000, storeCount: 3450, storeType: "hall",
    features: ["대한민국 1위 베이커리", "SPC그룹 계열", "매장 직접 제빵", "카페 메뉴 강화"],
    phone: "010-4708-6091", mainImage: "/brands/paris-baguette.png", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "3,300만원" }, { label: "교육비", value: "별도 협의" },
      { label: "인테리어", value: "8,000만원~" }, { label: "장비·집기", value: "5,000만원~" },
      { label: "초도 물량", value: "1,000만원~" }, { label: "보증금", value: "2,000만원" },
    ],
    franchiseFee: "3,300만원", educationFee: "별도 협의", royalty: "매출의 2%",
    standardArea: "30~50평", vatIncluded: true, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["SPC 물류 시스템", "제빵 기술 교육", "전국 마케팅", "매장 관리 시스템"],
  },
  {
    name: "더헤어", categoryId: "etc", categoryName: "기타", tagline: "오늘, 더 아름다운 당신",
    description: "프리미엄 헤어살롱 더헤어. Cut, Color, Perm, Clinic, Styling 등 종합 헤어 서비스를 제공합니다.",
    foundingCost: "5,000만원~8,000만원", foundingCostMin: 5000, storeCount: 120, storeType: "hall",
    features: ["프리미엄 헤어살롱", "종합 헤어 서비스", "본사 교육 시스템", "인테리어 지원"],
    phone: "010-4708-6091", mainImage: "/brands/the-hair.png", isFeatured: true,
    costBreakdown: [
      { label: "가맹비", value: "800만원" }, { label: "교육비", value: "300만원" },
      { label: "인테리어", value: "2,500만원~" }, { label: "장비·집기", value: "1,000만원~" },
      { label: "초도 물량", value: "200만원~" },
    ],
    franchiseFee: "800만원", educationFee: "300만원", royalty: "월 25만원",
    standardArea: "15~25평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["헤어 기술 교육", "제품 공급", "인테리어 설계", "마케팅 지원"],
  },
  {
    name: "보울스토리", categoryId: "korean", categoryName: "한식", tagline: "프리미엄 포케 & 라이스볼",
    description: "건강한 한 끼를 추구하는 프리미엄 포케 & 라이스볼 전문점. 신선한 재료와 다양한 토핑으로 나만의 볼을 완성할 수 있습니다.",
    foundingCost: "3,000만원~5,000만원", foundingCostMin: 3000, storeCount: 95, storeType: "delivery",
    features: ["커스텀 포케볼", "신선 식재료", "건강식 트렌드", "테이크아웃 특화"],
    phone: "010-4708-6091", mainImage: "/brands/bowl-story.jpg", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "300만원" }, { label: "교육비", value: "150만원" },
      { label: "인테리어", value: "1,500만원~" }, { label: "장비·집기", value: "700만원~" },
      { label: "초도 물량", value: "200만원~" },
    ],
    franchiseFee: "300만원", educationFee: "150만원", royalty: "월 15만원",
    standardArea: "10~15평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["식재료 공급", "레시피 교육", "배달앱 관리 지원", "매장 운영 매뉴얼"],
  },
  // Row 3
  {
    name: "맥도날드", categoryId: "korean", categoryName: "한식", tagline: "세상을 더 맛있게",
    description: "세계 최대 패스트푸드 프랜차이즈 맥도날드. 검증된 시스템과 글로벌 브랜드 파워가 강점입니다.",
    foundingCost: "5억원~10억원", foundingCostMin: 50000, storeCount: 420, storeType: "hall",
    features: ["글로벌 브랜드", "검증된 운영 시스템", "강력한 마케팅", "드라이브스루 확대"],
    phone: "010-4708-6091", mainImage: "/brands/mcdonalds.png", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "별도 협의" }, { label: "인테리어", value: "별도 협의" },
      { label: "장비·집기", value: "별도 협의" }, { label: "보증금", value: "별도 협의" },
    ],
    franchiseFee: "별도 협의", educationFee: "별도 협의", royalty: "매출의 5%",
    standardArea: "50평 이상", vatIncluded: true, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["글로벌 물류 시스템", "마케팅 캠페인", "매장 운영 시스템", "정기 품질 관리"],
  },
  {
    name: "브라운빈", categoryId: "cafe", categoryName: "카페", tagline: "Good Coffee, Better Days",
    description: "커피와 디저트를 함께 즐기는 프리미엄 카페 브라운빈. 고품질 원두와 세련된 인테리어가 특징입니다.",
    foundingCost: "4,000만원~7,000만원", foundingCostMin: 4000, storeCount: 150, storeType: "hall",
    features: ["프리미엄 원두", "디저트 라인업", "세련된 인테리어", "카페 문화 선도"],
    phone: "010-4708-6091", mainImage: "/brands/brown-bean.png", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "500만원" }, { label: "교육비", value: "200만원" },
      { label: "인테리어", value: "2,000만원~" }, { label: "장비·집기", value: "1,000만원~" },
      { label: "초도 물량", value: "300만원~" },
    ],
    franchiseFee: "500만원", educationFee: "200만원", royalty: "월 20만원",
    standardArea: "15~20평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["원두 직배송", "디저트 레시피", "인테리어 설계", "온라인 마케팅"],
  },
  {
    name: "비어플래닛", categoryId: "pub", categoryName: "주점", tagline: "세계 맥주의 모든 것",
    description: "전 세계의 다양한 수제 맥주를 한 곳에서 즐기는 월드비어펍. 독특한 분위기와 프리미엄 안주가 특징입니다.",
    foundingCost: "7,000만원~1억원", foundingCostMin: 7000, storeCount: 85, storeType: "hall",
    features: ["월드비어 라인업", "수제 맥주 특화", "프리미엄 안주", "이색 콘셉트"],
    phone: "010-4708-6091", mainImage: "/brands/beer-planet.jpg", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "1,000만원" }, { label: "교육비", value: "300만원" },
      { label: "인테리어", value: "3,500만원~" }, { label: "장비·집기", value: "1,500만원~" },
      { label: "초도 물량", value: "500만원~" },
    ],
    franchiseFee: "1,000만원", educationFee: "300만원", royalty: "월 35만원",
    standardArea: "25~35평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["수제맥주 공급", "맥주 교육", "인테리어 설계", "이벤트 기획 지원"],
  },
  {
    name: "오늘토스트", categoryId: "snack", categoryName: "분식", tagline: "매일 신선한 토스트",
    description: "매일 아침 신선하게 만드는 프리미엄 토스트 전문점. 간편하면서도 영양 가득한 한 끼를 합리적인 가격에 제공합니다.",
    foundingCost: "2,000만원~3,500만원", foundingCostMin: 2000, storeCount: 340, storeType: "delivery",
    features: ["소자본 창업", "간편 조리", "아침 식사 특화", "테이크아웃 최적"],
    phone: "010-4708-6091", mainImage: "/brands/today-toast.jpg", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "200만원" }, { label: "교육비", value: "100만원" },
      { label: "인테리어", value: "800만원~" }, { label: "장비·집기", value: "500만원~" },
      { label: "초도 물량", value: "200만원~" },
    ],
    franchiseFee: "200만원", educationFee: "100만원", royalty: "월 10만원",
    standardArea: "5~10평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["식재료 공급", "조리 교육", "배달앱 세팅", "매장 운영 가이드"],
  },
  // Row 4
  {
    name: "HiQ 빌리어드", categoryId: "billiard", categoryName: "당구장", tagline: "프리미엄 빌리어드 클럽",
    description: "프리미엄 당구장 프랜차이즈 HiQ Billiards. 고급 인테리어와 최신 장비를 갖추고, 편안한 환경에서 당구를 즐길 수 있는 새로운 문화 공간입니다.",
    foundingCost: "8,000만원~1.5억원", foundingCostMin: 8000, storeCount: 45, storeType: "hall",
    features: ["프리미엄 인테리어", "최신 당구 장비", "문화 공간 콘셉트", "멤버십 운영"],
    phone: "010-4708-6091", mainImage: "/brands/hiq-billiards.jpg", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "1,000만원" }, { label: "교육비", value: "200만원" },
      { label: "인테리어", value: "4,000만원~" }, { label: "당구대·장비", value: "3,000만원~" },
      { label: "기타", value: "500만원~" },
    ],
    franchiseFee: "1,000만원", educationFee: "200만원", royalty: "월 40만원",
    standardArea: "40~60평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["당구 장비 공급", "인테리어 설계", "멤버십 시스템", "운영 매뉴얼"],
  },
  {
    name: "메가커피 프리미엄", categoryId: "cafe", categoryName: "카페", tagline: "커피가 일상을 더 특별하게",
    description: "메가커피의 프리미엄 라인. 더 높은 품질의 스페셜티 커피와 디저트를 제공하는 카페입니다.",
    foundingCost: "7,000만원~1억원", foundingCostMin: 7000, storeCount: 180, storeType: "hall",
    features: ["스페셜티 원두", "프리미엄 디저트", "고급 인테리어", "차별화 메뉴"],
    phone: "010-4708-6091", mainImage: "/brands/mega-coffee-premium.png", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "800만원" }, { label: "교육비", value: "300만원" },
      { label: "인테리어", value: "3,500만원~" }, { label: "장비·집기", value: "2,000만원~" },
      { label: "초도 물량", value: "400만원~" },
    ],
    franchiseFee: "800만원", educationFee: "300만원", royalty: "월 30만원",
    standardArea: "20~30평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["스페셜티 원두 공급", "바리스타 교육", "프리미엄 인테리어", "마케팅 지원"],
  },
  {
    name: "GS25 프레시", categoryId: "etc", categoryName: "기타", tagline: "가까운 행복을 만나다",
    description: "GS25의 프레시 콘셉트 매장. Fresh Food와 Drink & Beverage에 특화된 새로운 형태의 라이프스타일 편의점입니다.",
    foundingCost: "8,000만원~1.2억원", foundingCostMin: 8000, storeCount: 520, storeType: "hall",
    features: ["프레시푸드 특화", "음료 바 운영", "라이프스타일 매장", "GS리테일 지원"],
    phone: "010-4708-6091", mainImage: "/brands/gs25-fresh.png", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "별도 협의" }, { label: "인테리어", value: "4,000만원~" },
      { label: "장비·집기", value: "3,000만원~" }, { label: "초도 물량", value: "1,500만원~" },
    ],
    franchiseFee: "별도 협의", educationFee: "무료", royalty: "매출 연동",
    standardArea: "25~35평", vatIncluded: true, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["GS리테일 물류", "POS 시스템", "프레시 메뉴 개발", "매장 운영 교육"],
  },
  {
    name: "교촌치킨 1991", categoryId: "chicken", categoryName: "치킨", tagline: "교촌은 다릅니다",
    description: "1991년 교촌의 전통을 이어가는 오리지널 매장. 시그니처 허니콤보와 정직한 맛의 치킨을 프리미엄 공간에서 즐길 수 있습니다.",
    foundingCost: "9,000만원~1.3억원", foundingCostMin: 9000, storeCount: 350, storeType: "hall",
    features: ["시그니처 허니콤보", "프리미엄 매장", "1991 오리지널", "특제 소스"],
    phone: "010-4708-6091", mainImage: "/brands/kyochon-1991.png", isFeatured: false,
    costBreakdown: [
      { label: "가맹비", value: "2,000만원" }, { label: "교육비", value: "500만원" },
      { label: "인테리어", value: "4,000만원~" }, { label: "장비·집기", value: "2,000만원~" },
      { label: "초도 물량", value: "500만원~" },
    ],
    franchiseFee: "2,000만원", educationFee: "500만원", royalty: "월 40만원",
    standardArea: "20~30평", vatIncluded: false, depositIncluded: false,
    startupProcess: COMMON_PROCESS,
    headquarters: ["프리미엄 매장 설계", "1991 레시피 교육", "마케팅 지원", "슈퍼바이저 배정"],
  },
];

export const dummyBrands: DummyBrand[] = brandData.map((b, i) => ({
  id: `brand-${String(i + 1).padStart(3, "0")}`,
  ...b,
}));

/* ── 공지사항 ── */
export const dummyNotices: Notice[] = [
  { id: "n-001", title: "마이프랜 온라인 창업박람회 오픈 안내", content: "마이프랜 온라인 창업박람회가 공식 오픈하였습니다. 다양한 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청해 보세요. 매월 다양한 이벤트와 혜택이 준비되어 있습니다.", date: "2026-10-15", category: "공지" },
  { id: "n-002", title: "10월 창업 컨설팅 무료 이벤트", content: "10월 한 달간 마이프랜을 통해 상담 신청하시는 모든 분께 무료 창업 컨설팅을 제공합니다. 전문 컨설턴트가 상권 분석부터 브랜드 선정까지 1:1로 도와드립니다.", date: "2026-10-10", category: "이벤트" },
  { id: "n-003", title: "신규 입점 브랜드 안내 — 메가커피, 교촌치킨 외 5개", content: "이번 달 새롭게 입점한 7개 브랜드를 소개합니다. 카페, 치킨, 한식 등 다양한 업종의 검증된 브랜드가 추가되었습니다.", date: "2026-10-05", category: "공지" },
  { id: "n-004", title: "창업 성공 사례: 메가커피 강남점 이야기", content: "직장인에서 카페 사장님으로 전환한 메가커피 강남점 김OO 대표의 성공 스토리를 공유합니다. 창업 준비부터 오픈, 안정화까지의 과정을 상세히 담았습니다.", date: "2026-09-28", category: "성공사례" },
  { id: "n-005", title: "마이프랜 홈페이지 리뉴얼 안내", content: "더 나은 서비스를 위해 마이프랜 홈페이지를 리뉴얼하였습니다. 브랜드 비교 기능이 강화되었으며, 모바일 환경에서도 편리하게 이용하실 수 있습니다.", date: "2026-09-20", category: "공지" },
];

/* ── 헬퍼 함수 ── */
export function getBrandsByBudget(min: number, max: number) {
  return dummyBrands.filter((b) => b.foundingCostMin >= min && b.foundingCostMin < max);
}

export function getBrandsByCategory(categoryId: string) {
  if (categoryId === "all") return dummyBrands;
  return dummyBrands.filter((b) => b.categoryId === categoryId);
}

export function getBrandsByStoreType(storeTypeId: string) {
  return dummyBrands.filter((b) => b.storeType === storeTypeId);
}
