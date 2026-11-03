/** 재사용 섹션 헤더 — eyebrow + h2 + description */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div style={{ textAlign: align, marginBottom: 32 }}>
      {eyebrow && (
        <span
          style={{
            display: "block",
            font: "700 12px/16px var(--font-sans)",
            letterSpacing: "0.18em",
            color: "var(--ink-muted)",
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="typo-h2"
        style={{ margin: 0, letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="typo-body"
          style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
