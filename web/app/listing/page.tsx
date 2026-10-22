import type { Metadata } from "next";
import ListingClient from "./ListingClient";

export const metadata: Metadata = {
  title: "브랜드 입점",
  description:
    "마이프랜 온라인 창업박람회에 브랜드를 입점하세요. 홈페이지 광고, 창업매거진 게재, 1:1 상담 연결 등 다양한 혜택을 제공합니다.",
  openGraph: {
    title: "브랜드 입점 | 마이프랜",
    description:
      "마이프랜에 브랜드를 입점하고 창업 고객과 연결하세요.",
  },
};

export default function ListingPage() {
  return <ListingClient />;
}
