import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "브랜드 비교",
  description: "최대 3개 프랜차이즈 브랜드를 선택하여 창업비용, 가맹비, 로열티, 매장 수 등을 한눈에 비교하세요.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
