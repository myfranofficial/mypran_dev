# 마이프랜 홈페이지 — 디자인 → 코드 구현 가이드

이 폴더는 확정된 **디자인 시안**입니다. 구현은 이 시안을 *그대로* 재현하는 것이 목표이며,
새로운 스타일을 만들지 않습니다. 애매하면 `design/*.dc.html`의 실제 값(px, 색, 굵기)을 따릅니다.

## 폴더
- `design/` — 화면 시안 (HTML). `{{ }}`, `<sc-for>`, `<x-dc>`, `class Component extends DCLogic`는
  디자인 툴 전용 문법이니 **복사하지 말고** 구조·스타일 값만 참고. `<sc-for>`는 반복 렌더링(map)으로 바꾼다.
  - `Main` / `Home-Mobile` — 홈 (PC 1440 / 모바일 390)
  - `Brands-PC` / `Brands-Mobile` — 브랜드 페이지
  - `Consult-PC` / `Consult-Mobile` — 상담 신청
  - `Photo-Spec` — 사진 슬롯 P1–P9 규격 (이미지 컴포넌트 구현 기준)
- `design-system/tokens.json` — 색·타입·간격·라운드·그림자 토큰 (단일 출처)
- `design-system/bundle.css` — 컴포넌트 클래스 (`mf-` 접두사) 참고 구현

## 스택 (권장)
- Next.js (App Router) + TypeScript + Tailwind CSS
- `next/font/google`로 **Noto Sans KR** 400/500/700/900
- 이미지는 `next/image` (`fill` + `object-fit: cover` + 슬롯별 `sizes`)

## 토큰 규칙 — 가장 중요
1. `tokens.json`을 `app/globals.css`의 `:root` CSS 변수로 옮기고, Tailwind `theme.extend`에 **같은 이름**으로 매핑한다.
   (예: `bg-red-500`, `text-ink-muted`, `border-line`, `rounded-md`=4px, `shadow-card`)
2. 하드코딩 색상 금지. 팔레트는 **검정·빨강·흰색만**. 그라데이션은 사진 위 어두운 오버레이에만.
3. 타입 스케일: display-hero 56 / price 64 / display-section 40 / title-section 28 / title-band 26 /
   body-lg 18 / body 15 / caption 13 / micro 12. 디스플레이는 900, 라벨 700, 자간 -0.01~-0.02em.
4. 라운드: 이미지 타일 2px, 버튼·입력 4px, CTA 박스 8px, **요금제·보유브랜드 카드는 0px(각진)**.
5. 그림자는 hover에만. 장식(메달, 월계수, 리본, 글로우, 이모지) 금지.

## 레이아웃 · 반응형
- 콘텐츠 폭 1200px (`max-width: 1248px; padding: 0 24px`), 섹션 간격 64px, 밴드 내부 상하 48px
- 브레이크포인트: `<768` 모바일(390 시안) · `768–1199` 태블릿(그리드 3열) · `≥1200` 데스크톱(1440 시안)
- 그리드: 매장 타일 6열 → 3열 → 2열 / 혜택 6 → 3 → 2 / 요금제 3 → 1(세로) / 보유 브랜드 4열 → 가로 스크롤
- 모바일 하단에 고정 바(전화 상담 + 무료 상담 신청) — `position: sticky; bottom: 0` + safe-area 패딩

## 페이지 구성 순서 (홈)
헤더(2단) → 히어로(night 오버레이) → 실적 바 → 베스트 브랜드 → 입점 요금제(베스트/프리미엄/스페셜)
→ 혜택 밴드(red-700) → 보유 브랜드(black 카드) → 상담 폼 → 연락 바(red-700) → 푸터.
빨간 밴드 두 개가 연달아 붙지 않게 한다.

## 헤더 (공통)
- 1단(80px): 로고 / 전화번호 / `무료 상담신청` 빨간 버튼
- 2단(56px): 메뉴 탭. 현재 페이지는 빨간 글자 + 3px 빨간 밑줄 (`aria-current="page"`)
- 모바일: 1단 60px, 2단 48px 가로 스크롤 탭

## 브랜드 등급 명칭
베스트 / **프리미엄** / **스페셜** (영문 BEST / PREMIUM / SPECIAL). 브랜드관 제목은 "마이프랜 브랜드관".

## 사진 슬롯 (Photo-Spec 기준)
`<PhotoSlot id="P3" ...>` 같은 공용 컴포넌트 하나로 만들고 비율을 강제한다.

| ID | 영역 | 비율 | 업로드 원본 |
|---|---|---|---|
| P1 | 메인 히어로 | PC 9:4 / M 3:4 (art direction, `<picture>`) | 2880×1280 / 1170×1560 |
| P2 | 서브 배너 | 9:2 / 2:1 | 2880×640 / 1170×585 |
| P3 | 매장 외관 | 4:3 | 1200×900 |
| P4 | 브랜드 로고 | 5:2, `object-fit: contain` | 1000×400 PNG/SVG |
| P5 | 추천 원형 | 1:1, 원형, 45% 어두운 오버레이 | 600×600 |
| P6 | 보유 브랜드 인테리어 | 16:9 | 1600×900 |
| P7 | 상담 장면 | 4:5 | 1200×1500 |
| P8 | 상담 배너 | 3:1 / 3:2 | 2400×800 / 1170×780 |
| P9 | OG 썸네일 | 1.91:1 | 1200×630 |

- 사진 없을 땐 `surface-muted` 배경 + 슬롯 ID 표시(개발용)
- 히어로·배너 위 텍스트는 사진이 아닌 HTML로. 브랜드명은 사진에 넣지 않고 캡션으로.

## 상담 신청 폼
- 필드: 성함*, 연락처*(010 / 4자리 / 4자리), 희망지역*(시/도 → 시/군/구), 창업 형태*(라디오 칩),
  관심 업종(체크 칩), 창업 예산, 관심 브랜드, 문의 내용, 개인정보 동의*
- 입력은 밑줄형(2px ink, 포커스 시 red-500). 칩 선택 시 검정 채움 + 흰 글자.
- 클라이언트 검증 + 서버 액션(전송처는 TBD: 이메일/DB/CRM). 스팸 방지(honeypot) 포함.
- 성공 시 같은 화면에서 완료 상태 표시 (페이지 이동 X)

## 접근성
- 실제 `<button>`, `<a>`, `<label>` 사용. 아이콘 버튼은 `aria-label`. 터치 영역 ≥44px.
- 포커스 링: 2px `--focus`, offset 2px.

## 아직 채워야 할 값 (임의 값 사용 금지)
대표자명, 사업자등록번호, 운영시간, 개인정보 보유기간, 가맹점 수, 요금제 세부 항목, 실적 숫자 근거, 실제 브랜드 데이터.
브랜드 데이터는 `data/brands.ts`(또는 CMS)로 분리: `{ id, name, tier: 'best'|'premium'|'special', category, logo, storefront, circle, storeCount }`.

## 검증
각 페이지를 1440px·390px로 Playwright 스크린샷을 찍어 `design/` 시안과 나란히 비교하고,
간격·폰트 굵기·색이 다르면 수정한다.
