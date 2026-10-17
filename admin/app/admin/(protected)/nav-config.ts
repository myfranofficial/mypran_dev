/**
 * 마이프랜 어드민 네비게이션 구성.
 */

export type AdminTab = { href: string; label: string };
export type AdminGroup = {
  href: string;
  label: string;
  icon: string;
  paths: string[];
  tabs?: AdminTab[];
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
    href: "/admin/brands",
    label: "브랜드 관리",
    icon: "stores",
    paths: ["/admin/brands"],
    tabs: [
      { href: "/admin/brands", label: "브랜드 목록" },
      { href: "/admin/brands/categories", label: "업종 카테고리" },
    ],
  },
  {
    href: "/admin/banners",
    label: "배너·공지",
    icon: "banners",
    paths: ["/admin/banners", "/admin/notices"],
    tabs: [
      { href: "/admin/banners", label: "배너" },
      { href: "/admin/notices", label: "공지" },
    ],
  },
  {
    href: "/admin/faq",
    label: "FAQ·자료실",
    icon: "events",
    paths: ["/admin/faq", "/admin/downloads"],
    tabs: [
      { href: "/admin/faq", label: "FAQ" },
      { href: "/admin/downloads", label: "자료실" },
    ],
  },
  {
    href: "/admin/consultations",
    label: "상담 문의",
    icon: "consultations",
    paths: ["/admin/consultations"],
    badge: true,
  },
  {
    href: "/admin/settings",
    label: "설정",
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
