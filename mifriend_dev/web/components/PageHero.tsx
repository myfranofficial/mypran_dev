/** 서브페이지 공통 히어로 배너 */
export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      style={{
        background: "var(--night)",
        color: "var(--on-brand)",
        textAlign: "center",
        padding: "48px 16px",
      }}
    >
      <div className="container-mf" style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          className="typo-h1"
          style={{ margin: 0, letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="typo-body"
            style={{ margin: "8px 0 0", color: "var(--night-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <style>{`
        @media (min-width: 768px) {
          section:has(.typo-h1) { padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
