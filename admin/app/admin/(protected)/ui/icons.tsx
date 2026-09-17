import type { SVGProps } from "react";

function Svg({ size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    />
  );
}
type IconProps = { size?: number; className?: string };

/* ── 사이드바 네비 ── */
export const IconDashboard = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.2" /><rect x="14" y="3" width="7" height="7" rx="1.2" /><rect x="3" y="14" width="7" height="7" rx="1.2" /><rect x="14" y="14" width="7" height="7" rx="1.2" /></Svg>
);
export const IconBanner = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="1.6" /><circle cx="8" cy="10" r="1.6" /><path d="M5 17l4.2-4 3 2.6L16 11l3 4" /></Svg>
);
export const IconNotice = (p: IconProps) => (
  <Svg {...p}><path d="M4 9.5v4a1 1 0 0 0 1 1h2.5L14 19V6l-6.5 4.5H5a1 1 0 0 0-1 1z" /><path d="M17.5 9a4 4 0 0 1 0 6" /></Svg>
);
export const IconGallery = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></Svg>
);
export const IconVideo = (p: IconProps) => (
  <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M10 9l5 3-5 3V9z" /></Svg>
);
export const IconStore = (p: IconProps) => (
  <Svg {...p}><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9" /><path d="M9 21V13h6v8" /><path d="M3 9h18" /></Svg>
);
export const IconEvent = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></Svg>
);
export const IconFaq = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></Svg>
);
export const IconDownload = (p: IconProps) => (
  <Svg {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></Svg>
);
export const IconPage = (p: IconProps) => (
  <Svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8M10 9H8" /></Svg>
);
export const IconHome = (p: IconProps) => (
  <Svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></Svg>
);
export const IconInbox = (p: IconProps) => (
  <Svg {...p}><path d="M22 12h-6l-2 3H10l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /></Svg>
);
export const IconSettings = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></Svg>
);

/* ── 케밥 액션 ── */
export const IconEdit = (p: IconProps) => (
  <Svg {...p}><path d="M4 20h4L18.5 9.5a2 2 0 0 0-2.83-2.83L5 17.2z" /><path d="M14 8.5 16 10.5" /></Svg>
);
export const IconTrash = (p: IconProps) => (
  <Svg {...p}><path d="M4 6.5h16" /><path d="M9 6.5V4.8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.7" /><path d="M6.5 6.5 7.3 20a1 1 0 0 0 1 .9h7.4a1 1 0 0 0 1-.9l.8-13.5" /><path d="M10 10.5v6M14 10.5v6" /></Svg>
);
export const IconEye = (p: IconProps) => (
  <Svg {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.6" /></Svg>
);
export const IconEyeOff = (p: IconProps) => (
  <Svg {...p}><path d="M4 4l16 16" /><path d="M9.7 5.8A9.5 9.5 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15 15 0 0 1-3 3.6" /><path d="M6.5 7.6A15 15 0 0 0 2.5 12S6 18.5 12 18.5a9 9 0 0 0 3.3-.6" /><path d="M9.9 10.1a2.6 2.6 0 0 0 3.6 3.6" /></Svg>
);
export const IconPin = (p: IconProps) => (
  <Svg {...p}><path d="M9 3.5h6l-1 5 3 3v2H7v-2l3-3z" /><path d="M12 13.5V21" /></Svg>
);
export const IconArrowUp = (p: IconProps) => (
  <Svg {...p}><path d="M12 19V6" /><path d="M6.5 11 12 5.5 17.5 11" /></Svg>
);
export const IconArrowDown = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v13" /><path d="M6.5 13 12 18.5 17.5 13" /></Svg>
);
export const IconPlus = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);
export const IconCheck = (p: IconProps) => (
  <Svg {...p}><path d="M4.5 12.5 10 18 20 6.5" /></Svg>
);
export const IconX = (p: IconProps) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
export const IconSearch = (p: IconProps) => (
  <Svg {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l4.5 4.5" /></Svg>
);

/** 네비 키 → 아이콘 */
export const NAV_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  dashboard: IconDashboard,
  banners: IconBanner,
  notices: IconNotice,
  gallery: IconGallery,
  videos: IconVideo,
  stores: IconStore,
  events: IconEvent,
  faq: IconFaq,
  downloads: IconDownload,
  pages: IconPage,
  homepage: IconHome,
  consultations: IconInbox,
  settings: IconSettings,
};
