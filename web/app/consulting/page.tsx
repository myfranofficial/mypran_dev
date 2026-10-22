import type { Metadata } from "next";
import ConsultingClient from "./ConsultingClient";

export const metadata: Metadata = {
  title: "창업정보",
  description:
    "프랜차이즈 창업 트렌드, 소자본 창업 가이드, 상권 분석 자료 등 예비 창업자를 위한 최신 창업정보를 제공합니다.",
  openGraph: {
    title: "창업정보 | 마이프랜",
    description:
      "프랜차이즈 창업에 필요한 최신 정보를 확인하세요.",
  },
};

export default function ConsultingPage() {
  return <ConsultingClient />;
}
