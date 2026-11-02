import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { readSiteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "이용약관",
  description: "마이프랜 서비스 이용약관입니다.",
};

/** 줄바꿈 텍스트를 <p> 블록으로 변환 */
function TextBlock({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} style={{ margin: "12px 0", whiteSpace: "pre-wrap" }}>
          {para}
        </p>
      ))}
    </>
  );
}

const DEFAULT_TERMS = `제1조 (목적)

본 약관은 주식회사 마이프랜(이하 "회사")이 운영하는 마이프랜 웹사이트(이하 "사이트")에서 제공하는 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.

제2조 (정의)

1. "서비스"란 회사가 사이트를 통해 제공하는 프랜차이즈 브랜드 정보 제공, 창업 상담 연결 등 일체의 서비스를 말합니다.
2. "이용자"란 사이트에 접속하여 본 약관에 따라 서비스를 이용하는 자를 말합니다.

제3조 (약관의 효력)

본 약관은 사이트에 공시함으로써 효력을 발생하며, 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 내에서 개정될 수 있습니다.

* 본 이용약관은 예시이며, 실제 운영 시 법률 검토를 거쳐 확정됩니다.`;

export default function TermsPage() {
  const site = readSiteData();
  const content = site.terms || DEFAULT_TERMS;

  return (
    <>
      <PageHero title="이용약관" />
      <div
        className="container-mf section-py"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <article className="typo-body" style={{ color: "var(--ink-muted)" }}>
          <TextBlock text={content} />
        </article>
      </div>
    </>
  );
}
