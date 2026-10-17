import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "브랜드 찾기",
  description: "업종별·예산별·매장형태별로 100+ 프랜차이즈 브랜드를 비교하세요. 카페, 치킨, 한식, 편의점 등 다양한 업종의 검증된 브랜드 정보를 제공합니다.",
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
