/**
 * 마이프랜 어드민 네비게이션 구성.
 * 사이드바 그룹 + 그룹 내 탭을 한 곳에서 정의.
 */

export type AdminTab = { href: string; label: string };
export type AdminGroup = {
  href: string;
  label: string;
  icon: string;
  paths: string[];
  tabs?: AdminTab[];
  /** 미읽음 뱃지 표시용 (consultations) */
  badge?: boolean;
};

export const ADMIN_GROUPS: AdminGroup[] = [
  {
    href: "/admin",
    label: "대시보드",
    icon: "dashboard",
    paths: ["/admin"],
  },
  {
    href: "/admin/banners",
    label: "배너·공지·팝업",
    icon: "banners",
    paths: ["/admin/banners", "/admin/notices", "/admin/popups"],
    tabs: [
      { href: "/admin/banners", label: "히어로 배너" },
      { href: "/admin/notices", label: "공지사항" },
      { href: "/admin/popups", label: "팝업" },
    ],
  },
  {
    href: "/admin/gallery",
    label: "브랜드 미디어",
    icon: "gallery",
    paths: ["/admin/gallery", "/admin/videos"],
    tabs: [
      { href: "/admin/gallery", label: "사진 갤러리" },
      { href: "/admin/videos", label: "영상 갤러리" },
    ],
  },
  {
    href: "/admin/brands",
    label: "브랜드 관리",
    icon: "stores",
    paths: ["/admin/brands"],
  },
  {
    href: "/admin/events",
    label: "이벤트·FAQ·자료",
    icon: "events",
    paths: ["/admin/events", "/admin/faq", "/admin/downloads"],
    tabs: [
      { href: "/admin/events", label: "이벤트" },
      { href: "/admin/faq", label: "자주 묻는 질문" },
      { href: "/admin/downloads", label: "자료실" },
    ],
  },
  {
    href: "/admin/pages",
    label: "페이지 편집",
    icon: "pages",
    paths: ["/admin/pages", "/admin/homepage", "/admin/page-images"],
    tabs: [
      { href: "/admin/pages", label: "서브페이지" },
      { href: "/admin/homepage", label: "메인페이지" },
      { href: "/admin/page-images", label: "페이지 이미지" },
    ],
  },
  {
    href: "/admin/reviews",
    label: "창업 후기",
    icon: "reviews",
    paths: ["/admin/reviews"],
  },
  {
    href: "/admin/consultations",
    label: "상담 신청",
    icon: "consultations",
    paths: ["/admin/consultations"],
    badge: true,
  },
  {
    href: "/admin/settings",
    label: "사이트 설정",
    icon: "settings",
    paths: ["/admin/settings"],
  },
];

function underPath(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(base + "/");
}

export function isPathInGroup(pathname: string, g: AdminGroup): boolean {
  if (g.href === "/admin") return pathname === "/admin";
  return g.paths.some((p) => underPath(pathname, p));
}

export function findGroup(pathname: string): AdminGroup | undefined {
  return ADMIN_GROUPS.find((g) => isPathInGroup(pathname, g));
}

export function activeTabHref(pathname: string, g: AdminGroup): string | undefined {
  if (!g.tabs) return undefined;
  let best: string | undefined;
  let bestLen = -1;
  for (const t of g.tabs) {
    if (underPath(pathname, t.href) && t.href.length > bestLen) {
      best = t.href;
      bestLen = t.href.length;
    }
  }
  return best;
}
