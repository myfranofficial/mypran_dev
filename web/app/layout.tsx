import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { readSiteData } from "@/lib/site-data";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto",
});

const SITE_URL = "https://xn--lj2b54b90v2gn.kr";
const SITE_NAME = "마이프랜";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "마이프랜 — 프랜차이즈 비교는 필수입니다",
    template: "%s | 마이프랜",
  },
  description:
    "100+ 프랜차이즈 브랜드를 한눈에 비교! 업종별·예산별 브랜드 찾기, 창업비용 비교, 무료 창업 상담까지. 마이프랜 온라인 창업박람회.",
  keywords: [
    "프랜차이즈", "창업", "가맹점", "브랜드비교", "창업상담",
    "마이프랜", "온라인창업박람회", "프랜차이즈비교",
    "소자본창업", "창업비용", "프랜차이즈추천",
  ],
  openGraph: {
    title: "마이프랜 — 프랜차이즈 비교는 필수입니다",
    description: "100+ 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청하세요.",
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "마이프랜 — 프랜차이즈 비교는 필수입니다",
    description: "100+ 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    other: { "naver-site-verification": "befb94a2f3485139581136a3ec2d36bde7581a54" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = readSiteData();

  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body style={{ fontFamily: "var(--font-noto), var(--font-sans)" }}>
        <Header phone={site.phone} />
        <main style={{ paddingBottom: 76 }}>
          {children}
        </main>
        <Footer address={site.address} email={site.email} copyright={site.copyright} />
        <MobileBottomBar phone={site.phone} />
      </body>
    </html>
  );
}
