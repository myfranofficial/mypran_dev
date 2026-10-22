import type { Metadata } from "next";
import { readBrands } from "@/lib/brands-store";
import BrandsClient from "./BrandsClient";

export const metadata: Metadata = {
  title: "브랜드 찾기",
  description:
    "업종별·예산별·매장형태별로 100개 이상의 프랜차이즈 브랜드를 검색하고 비교하세요. 카페, 치킨, 편의점, 뷰티 등 다양한 업종의 창업 정보를 제공합니다.",
  openGraph: {
    title: "브랜드 찾기 | 마이프랜",
    description:
      "업종별·예산별로 나에게 맞는 프랜차이즈 브랜드를 찾아보세요.",
  },
};

export default function BrandsPage() {
  const brands = readBrands();
  return <BrandsClient initialBrands={brands} />;
}
