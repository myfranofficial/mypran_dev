/** MF hexagon logo with brand text */

type LogoProps = {
  /** Hexagon width */
  iconSize?: number;
  /** Show sub-text */
  showSub?: boolean;
  /** Class override */
  className?: string;
};

export default function Logo({
  iconSize = 40,
  showSub = true,
  className,
}: LogoProps) {
  const h = Math.round(iconSize * 1.1);
  return (
    <span
      className={className}
      style={{ display: "flex", alignItems: "center", gap: 10 }}
    >
      <svg
        width={iconSize}
        height={h}
        viewBox="0 0 40 44"
        aria-hidden
      >
        <path d="M20 0l20 11v22L20 44 0 33V11z" fill="var(--ink)" />
        <text
          x="20"
          y="28"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={900}
          fontSize={15}
          fill="var(--red-500)"
        >
          MF
        </text>
      </svg>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            font: `900 ${iconSize >= 34 ? 22 : 18}px/${iconSize >= 34 ? 24 : 20}px var(--font-sans)`,
            letterSpacing: "-0.02em",
          }}
        >
          마이<span style={{ color: "var(--red-500)" }}>프랜</span>
        </span>
        {showSub && (
          <span
            style={{
              font: `400 ${iconSize >= 34 ? 11 : 10}px/14px var(--font-sans)`,
              color: "var(--ink-muted)",
            }}
          >
            프랜차이즈 창업 컨설팅 그룹
          </span>
        )}
      </span>
    </span>
  );
}
