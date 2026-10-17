import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "창업정보",
  description: "프랜차이즈 창업 공지사항, 창업 자료, 브랜드 소식 등 창업에 필요한 최신 정보를 확인하세요.",
};

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
