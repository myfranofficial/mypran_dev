import type { Metadata } from "next";
import { readBrands } from "@/lib/brands-store";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "브랜드 비교",
  description:
    "최대 3개 프랜차이즈 브랜드를 선택하여 창업비용, 가맹비, 로열티, 매장 수 등을 한눈에 비교하세요.",
  openGraph: {
    title: "브랜드 비교 | 마이프랜",
    description:
      "프랜차이즈 브랜드를 나란히 비교하고 나에게 맞는 브랜드를 찾으세요.",
  },
};

export default function ComparePage() {
  const brands = readBrands();
  return <CompareClient initialBrands={brands} />;
}
