import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "성공 사례",
  description:
    "마이프랜과 함께 성공한 프랜차이즈 창업 이야기를 확인하세요. 다양한 업종의 실제 성공 스토리를 소개합니다.",
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        title="성공 사례"
        subtitle="마이프랜과 함께 성공한 창업 이야기"
      />
      <div className="container-mf section-py" style={{ textAlign: "center" }}>
        <p className="typo-body" style={{ color: "var(--ink-muted)", marginBottom: 32 }}>
          성공 사례 페이지가 준비 중입니다.
          <br />
          다양한 창업 성공 스토리를 곧 만나보실 수 있습니다.
        </p>
        <Link href="/brands" className="btn-primary">
          입점 브랜드 보기
        </Link>
      </div>
    </>
  );
}
