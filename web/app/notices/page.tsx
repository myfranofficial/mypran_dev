import type { Metadata } from "next";
import NoticesClient from "./NoticesClient";

export const metadata: Metadata = {
  title: "공지사항",
  description:
    "마이프랜의 새로운 소식, 이벤트, 서비스 업데이트 등 최신 공지사항을 확인하세요.",
};

export default function NoticesPage() {
  return <NoticesClient />;
}
