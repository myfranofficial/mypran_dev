import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "브랜드 입점",
  description: "마이프랜에 프랜차이즈 브랜드를 입점하고 창업 고객과 연결하세요. 입점 상품 안내 및 신청 양식을 제공합니다.",
};

export default function ListingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
