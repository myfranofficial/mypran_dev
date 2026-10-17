import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "마이프랜 — 프랜차이즈 비교는 필수입니다",
  description:
    "좋은 브랜드와 좋은 사람을 연결하는 프랜차이즈 창업 컨설팅 그룹. 업종별 대표 프랜차이즈 브랜드를 비교하고, 무료 창업 상담을 신청하세요.",
  openGraph: {
    title: "마이프랜 — 프랜차이즈 비교는 필수입니다",
    description:
      "좋은 브랜드와 좋은 사람을 연결하는 프랜차이즈 창업 컨설팅 그룹",
    type: "website",
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
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body style={{ fontFamily: "var(--font-noto), var(--font-sans)" }}>
        <Header />
        <main style={{ paddingBottom: 76 }}>
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
