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

/* ── 브랜드 (상하좌우 이미지 겹치지 않게 배치) ── */
/*
  4열 그리드 배치:
  Row 0: 메가커피     | 롯데리아     | 브레드마루     | GS25
  Row 1: 교촌치킨     | CU          | 강여사불백집   | 빽다방
  Row 2: 치맥피플     | 파리바게뜨   | 더헤어        | 보울스토리
  Row 3: 맥도날드     | 브라운빈     | 비어플래닛     | 오늘토스트
  Row 4: HiQ빌리어드  | 메가커피P    | GS25프레시    | 교촌1991
*/
const brandData: Omit<DummyBrand, "id">[] = [
  // Row 0
  { name: "메가커피", categoryId: "cafe", categoryName: "카페·디저트", tagline: "크게 즐기는 커피의 행복", description: "메가커피는 빅사이즈 2샷을 기본으로 합리적인 가격에 프리미엄 커피를 제공하는 대한민국 대표 커피 프랜차이즈입니다. 전국 3,000개 이상의 매장을 운영하며, 체계적인 물류 시스템과 교육 프로그램으로 안정적인 창업을 지원합니다.", foundingCost: "5,000만원~8,000만원", storeCount: 3200, features: ["빅사이즈 2샷 기본", "합리적 가격대", "전국 물류 시스템", "체계적 교육 프로그램"], phone: "010-4708-6091", mainImage: "/brands/mega-coffee.png", isFeatured: true },
  { name: "롯데리아", categoryId: "food", categoryName: "외식·한식", tagline: "언제나 맛있는 즐거움", description: "대한민국 대표 버거 브랜드 롯데리아. 한국인의 입맛에 맞춘 메뉴 개발과 전국 1,300여 개 매장 네트워크로 안정적인 프랜차이즈 운영이 가능합니다.", foundingCost: "1억원~2억원", storeCount: 1350, features: ["대한민국 대표 버거", "한국형 메뉴 개발", "전국 매장 네트워크", "본사 물류 지원"], phone: "010-4708-6091", mainImage: "/brands/lotteria.png", isFeatured: true },
  { name: "브레드마루", categoryId: "cafe", categoryName: "카페·디저트", tagline: "갓 구운 빵이 있는 행복한 하루", description: "프리미엄 베이커리 카페 브레드마루. 매장에서 직접 굽는 신선한 빵과 커피를 함께 즐길 수 있으며, 좋은 재료로 만드는 건강한 빵을 추구합니다.", foundingCost: "6,000만원~1억원", storeCount: 280, features: ["매장 직접 제빵", "프리미엄 원재료", "카페 겸업 운영", "시즌 한정 메뉴"], phone: "010-4708-6091", mainImage: "/brands/bread-maru.png", isFeatured: true },
  { name: "GS25", categoryId: "retail", categoryName: "편의·리테일", tagline: "일상 속 행복을 더하는 편의점", description: "GS리테일이 운영하는 대한민국 대표 편의점 GS25. Lifestyle Platform으로서 다양한 먹거리와 생활 서비스를 제공하며, 강력한 물류 시스템이 특징입니다.", foundingCost: "1억원~1.5억원", storeCount: 17200, features: ["24시간 운영", "GS리테일 물류망", "PB 상품 경쟁력", "모바일 결제 시스템"], phone: "010-4708-6091", mainImage: "/brands/gs25.png", isFeatured: true },

  // Row 1
  { name: "교촌치킨", categoryId: "chicken", categoryName: "치킨·피자", tagline: "정직한 맛이 만드는 행복 시간", description: "1991년부터 이어온 교촌치킨의 정직한 맛. 특제 간장 소스와 국내산 닭을 사용한 프리미엄 치킨 프랜차이즈입니다. 치킨이 생각나는 시간, 교촌치킨.", foundingCost: "8,000만원~1.2억원", storeCount: 1400, features: ["1991년 전통", "특제 간장 소스", "국내산 닭 사용", "배달·포장·홀 겸업"], phone: "010-4708-6091", mainImage: "/brands/kyochon.png", isFeatured: true },
  { name: "CU", categoryId: "retail", categoryName: "편의·리테일", tagline: "언제나 가까운 행복", description: "BGF리테일이 운영하는 대한민국 1위 편의점 CU. Fresh & Tasty 콘셉트로 맛있는 행복이 가득한 곳, 전국 17,000개 이상의 매장을 보유하고 있습니다.", foundingCost: "1억원~1.5억원", storeCount: 17500, features: ["전국 1위 매장 수", "BGF리테일 물류", "Fresh & Tasty", "무인 결제 도입"], phone: "010-4708-6091", mainImage: "/brands/cu.png", isFeatured: true },
  { name: "강여사의 불백집", categoryId: "food", categoryName: "외식·한식", tagline: "불맛 가득한, 행복한 한 상", description: "정성으로 만드는 한 끼의 행복. 강여사의 불백집은 프리미엄 불백을 합리적인 가격에 제공하는 한식 프랜차이즈입니다. 불맛이 다르다는 평가를 받고 있습니다.", foundingCost: "4,000만원~6,000만원", storeCount: 350, features: ["프리미엄 불백 전문", "자체 개발 양념", "간편 조리 시스템", "높은 회전율"], phone: "010-4708-6091", mainImage: "/brands/bulbaek.png", isFeatured: true },
  { name: "빽다방", categoryId: "cafe", categoryName: "카페·디저트", tagline: "가성비 좋은 맛있는 커피", description: "빽종원의 빽다방. 합리적인 가격에 맛있는 커피와 음료를 제공하는 국민 카페 프랜차이즈입니다. 소자본 창업이 가능하며 높은 브랜드 인지도가 강점입니다.", foundingCost: "3,000만원~5,000만원", storeCount: 1600, features: ["빽종원 브랜드", "합리적 가격대", "소자본 창업", "높은 인지도"], phone: "010-4708-6091", mainImage: "/brands/paik-coffee.png", isFeatured: true },

  // Row 2
  { name: "치맥피플", categoryId: "pub", categoryName: "주점·술집", tagline: "치맥이 사람을 행복하게 한다", description: "Good Chicken, Good Beer, Better Life. 치맥피플은 바삭한 프라이드 치킨과 시원한 생맥주를 함께 즐기는 치킨&비어 펍 프랜차이즈입니다.", foundingCost: "6,000만원~9,000만원", storeCount: 180, features: ["프라이드치킨 전문", "생맥주 시스템", "트렌디한 인테리어", "야간 매출 특화"], phone: "010-4708-6091", mainImage: "/brands/chimac-people.png", isFeatured: true },
  { name: "파리바게뜨", categoryId: "cafe", categoryName: "카페·디저트", tagline: "Fresh Bread, Happy Moments", description: "SPC그룹의 대표 베이커리 브랜드 파리바게뜨. 전국 3,400개 이상의 매장을 운영하는 대한민국 No.1 베이커리 카페입니다.", foundingCost: "1.5억원~3억원", storeCount: 3450, features: ["대한민국 1위 베이커리", "SPC그룹 계열", "매장 직접 제빵", "카페 메뉴 강화"], phone: "010-4708-6091", mainImage: "/brands/paris-baguette.png", isFeatured: false },
  { name: "더헤어", categoryId: "service", categoryName: "서비스·교육", tagline: "오늘, 더 아름다운 당신", description: "프리미엄 헤어살롱 더헤어. Cut, Color, Perm, Clinic, Styling 등 종합 헤어 서비스를 제공합니다. 헤어가 스타일이 되다.", foundingCost: "5,000만원~8,000만원", storeCount: 120, features: ["프리미엄 헤어살롱", "종합 헤어 서비스", "본사 교육 시스템", "인테리어 지원"], phone: "010-4708-6091", mainImage: "/brands/the-hair.png", isFeatured: true },
  { name: "보울스토리", categoryId: "food", categoryName: "외식·한식", tagline: "프리미엄 포케 & 라이스볼", description: "건강한 한 끼를 추구하는 프리미엄 포케 & 라이스볼 전문점. 신선한 재료와 다양한 토핑으로 나만의 볼을 완성할 수 있습니다.", foundingCost: "3,000만원~5,000만원", storeCount: 95, features: ["커스텀 포케볼", "신선 식재료", "건강식 트렌드", "테이크아웃 특화"], phone: "010-4708-6091", mainImage: "/brands/bowl-story.jpg", isFeatured: false },

  // Row 3
  { name: "맥도날드", categoryId: "food", categoryName: "외식·한식", tagline: "세상을 더 맛있게", description: "세계 최대 패스트푸드 프랜차이즈 맥도날드. 전 세계 40,000개 이상의 매장을 운영하며, 검증된 시스템과 글로벌 브랜드 파워가 강점입니다.", foundingCost: "5억원~10억원", storeCount: 420, features: ["글로벌 브랜드", "검증된 운영 시스템", "강력한 마케팅", "드라이브스루 확대"], phone: "010-4708-6091", mainImage: "/brands/mcdonalds.png", isFeatured: false },
  { name: "브라운빈", categoryId: "cafe", categoryName: "카페·디저트", tagline: "Good Coffee, Better Days", description: "커피와 디저트를 함께 즐기는 프리미엄 카페 브라운빈. 세련된 인테리어와 고품질 원두로 특별한 카페 경험을 제공합니다.", foundingCost: "4,000만원~7,000만원", storeCount: 150, features: ["프리미엄 원두", "디저트 라인업", "세련된 인테리어", "카페 문화 선도"], phone: "010-4708-6091", mainImage: "/brands/brown-bean.png", isFeatured: false },
  { name: "비어플래닛", categoryId: "pub", categoryName: "주점·술집", tagline: "세계 맥주의 모든 것", description: "전 세계의 다양한 수제 맥주를 한 곳에서 즐기는 월드비어펍. 독특한 분위기와 프리미엄 안주로 맥주 마니아들의 사랑을 받고 있습니다.", foundingCost: "7,000만원~1억원", storeCount: 85, features: ["월드비어 라인업", "수제 맥주 특화", "프리미엄 안주", "이색 콘셉트"], phone: "010-4708-6091", mainImage: "/brands/beer-planet.jpg", isFeatured: false },
  { name: "오늘토스트", categoryId: "food", categoryName: "외식·한식", tagline: "매일 신선한 토스트", description: "매일 아침 신선하게 만드는 프리미엄 토스트 전문점. 간편하면서도 영양 가득한 한 끼를 합리적인 가격에 제공합니다.", foundingCost: "2,000만원~3,500만원", storeCount: 340, features: ["소자본 창업", "간편 조리", "아침 식사 특화", "테이크아웃 최적"], phone: "010-4708-6091", mainImage: "/brands/today-toast.jpg", isFeatured: false },

  // Row 4
  { name: "HiQ 빌리어드", categoryId: "service", categoryName: "서비스·교육", tagline: "프리미엄 빌리어드 클럽", description: "프리미엄 당구장 프랜차이즈 HiQ Billiards. 고급 인테리어와 최신 장비를 갖추고, 편안한 환경에서 당구를 즐길 수 있는 새로운 문화 공간입니다.", foundingCost: "8,000만원~1.5억원", storeCount: 45, features: ["프리미엄 인테리어", "최신 당구 장비", "문화 공간 콘셉트", "멤버십 운영"], phone: "010-4708-6091", mainImage: "/brands/hiq-billiards.jpg", isFeatured: false },
  { name: "메가커피 프리미엄", categoryId: "cafe", categoryName: "카페·디저트", tagline: "커피가 일상을 더 특별하게", description: "메가커피의 프리미엄 라인. Good Coffee, Better Life를 슬로건으로 더 높은 품질의 스페셜티 커피와 디저트를 제공하는 카페입니다.", foundingCost: "7,000만원~1억원", storeCount: 180, features: ["스페셜티 원두", "프리미엄 디저트", "고급 인테리어", "차별화 메뉴"], phone: "010-4708-6091", mainImage: "/brands/mega-coffee-premium.png", isFeatured: false },
  { name: "GS25 프레시", categoryId: "retail", categoryName: "편의·리테일", tagline: "가까운 행복을 만나다", description: "GS25의 프레시 콘셉트 매장. Fresh Food와 Drink & Beverage에 특화된 새로운 형태의 라이프스타일 편의점입니다.", foundingCost: "8,000만원~1.2억원", storeCount: 520, features: ["프레시푸드 특화", "음료 바 운영", "라이프스타일 매장", "GS리테일 지원"], phone: "010-4708-6091", mainImage: "/brands/gs25-fresh.png", isFeatured: false },
  { name: "교촌치킨 1991", categoryId: "chicken", categoryName: "치킨·피자", tagline: "교촌은 다릅니다", description: "1991년 교촌의 전통을 이어가는 오리지널 매장. 교촌의 시그니처 허니콤보와 정직한 맛의 치킨을 프리미엄 공간에서 즐길 수 있습니다.", foundingCost: "9,000만원~1.3억원", storeCount: 350, features: ["시그니처 허니콤보", "프리미엄 매장", "1991 오리지널", "특제 소스"], phone: "010-4708-6091", mainImage: "/brands/kyochon-1991.png", isFeatured: false },
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
