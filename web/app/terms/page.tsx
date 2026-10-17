import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "이용약관",
  description: "마이프랜 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="이용약관" />
      <div
        className="container-mf section-py"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <article className="typo-body" style={{ color: "var(--ink-muted)" }}>
          <h2 className="typo-h2" style={{ color: "var(--ink)", marginBottom: 16 }}>
            제1조 (목적)
          </h2>
          <p>
            본 약관은 주식회사 마이프랜(이하 &quot;회사&quot;)이 운영하는 마이프랜 웹사이트(이하 &quot;사이트&quot;)에서
            제공하는 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className="typo-h2" style={{ color: "var(--ink)", margin: "32px 0 16px" }}>
            제2조 (정의)
          </h2>
          <p>
            1. &quot;서비스&quot;란 회사가 사이트를 통해 제공하는 프랜차이즈 브랜드 정보 제공, 창업 상담 연결 등 일체의 서비스를 말합니다.
            <br />
            2. &quot;이용자&quot;란 사이트에 접속하여 본 약관에 따라 서비스를 이용하는 자를 말합니다.
          </p>

          <h2 className="typo-h2" style={{ color: "var(--ink)", margin: "32px 0 16px" }}>
            제3조 (약관의 효력)
          </h2>
          <p>
            본 약관은 사이트에 공시함으로써 효력을 발생하며, 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 내에서
            개정될 수 있습니다.
          </p>

          <p style={{ marginTop: 48, color: "var(--smoke)" }}>
            * 본 이용약관은 예시이며, 실제 운영 시 법률 검토를 거쳐 확정됩니다.
          </p>
        </article>
      </div>
    </>
  );
}
