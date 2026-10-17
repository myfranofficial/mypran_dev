import Image from "next/image";

/**
 * PhotoSlot — Unified image component for all photo slots (P1–P9).
 *
 * When `src` is provided, renders a next/image with cover fit.
 * When `src` is absent, renders a placeholder with the slot ID.
 *
 * For P1 hero (art direction), use <picture> wrapping via the `mobileSrc`
 * prop which renders separate source sets for PC/mobile aspect ratios.
 */

export type PhotoSlotProps = {
  /** Slot ID: P1–P9 */
  id: string;
  /** Image source URL */
  src?: string;
  /** Mobile-specific image for art direction (P1, P2, P8) */
  mobileSrc?: string;
  /** Alt text */
  alt?: string;
  /** CSS aspect-ratio for PC (e.g. "9/4") */
  aspectRatio?: string;
  /** CSS aspect-ratio for mobile (e.g. "3/4") — if different from PC */
  mobileAspectRatio?: string;
  /** object-fit override (default: cover) */
  objectFit?: "cover" | "contain";
  /** Round style: sm | md | none | pill */
  rounded?: "sm" | "md" | "lg" | "none" | "pill";
  /** Additional className */
  className?: string;
  /** Whether to fill parent instead of using aspect-ratio */
  fill?: boolean;
  /** Width/height for non-fill mode */
  width?: number;
  height?: number;
  /** Dark placeholder background */
  dark?: boolean;
  /** Priority loading (for hero/above fold) */
  priority?: boolean;
  /** Responsive sizes hint */
  sizes?: string;
};

const RADIUS_MAP: Record<string, string> = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  none: "0",
  pill: "var(--radius-pill)",
};

export default function PhotoSlot({
  id,
  src,
  mobileSrc,
  alt = "",
  aspectRatio,
  mobileAspectRatio,
  objectFit = "cover",
  rounded = "none",
  className = "",
  fill = false,
  width,
  height,
  dark = false,
  priority = false,
  sizes,
}: PhotoSlotProps) {
  const borderRadius = RADIUS_MAP[rounded] ?? "0";
  const bgColor = dark ? "var(--black-soft)" : "var(--surface-muted)";

  const wrapStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius,
    background: bgColor,
    ...(fill
      ? { width: "100%", height: "100%" }
      : width && height
        ? { width, height }
        : { aspectRatio }),
  };

  // If no source, render placeholder
  if (!src) {
    return (
      <div
        className={className}
        style={{
          ...wrapStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          outline: `1px dashed var(--line-control)`,
          outlineOffset: -6,
          color: dark ? "var(--smoke)" : "var(--ink-muted)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            font: "700 11px/14px var(--font-sans)",
            letterSpacing: "0.12em",
            color: dark ? "var(--surface)" : "var(--ink)",
          }}
        >
          {id}
        </span>
      </div>
    );
  }

  // With image
  return (
    <div className={className} style={wrapStyle}>
      {/* Mobile aspect ratio override */}
      {mobileAspectRatio && (
        <style>{`
          @media (max-width: 767px) {
            .photo-slot-${id.toLowerCase()} { aspect-ratio: ${mobileAspectRatio} !important; }
          }
        `}</style>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 767px) 100vw, 1440px"}
        style={{ objectFit }}
        priority={priority}
      />
    </div>
  );
}
