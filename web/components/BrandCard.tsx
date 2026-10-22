import Link from "next/link";
import PhotoSlot from "./PhotoSlot";
import type { Brand } from "@/lib/brand-types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "var(--ink)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        background: "var(--surface)",
      }}
    >
      <PhotoSlot
        id="P3"
        src={brand.mainImage}
        aspectRatio="4/3"
        alt={`${brand.name} 매장`}
        sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 280px"
      />
      <div style={{ padding: "12px 12px 16px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            background: "var(--red-50)",
            color: "var(--red-500)",
            borderRadius: "var(--radius-sm)",
            font: "500 11px/16px var(--font-sans)",
            marginBottom: 6,
          }}
        >
          {brand.categoryName}
        </span>
        <h3
          style={{
            margin: 0,
            font: "700 15px/21px var(--font-sans)",
          }}
        >
          {brand.name}
        </h3>
        <p
          style={{
            margin: "2px 0 0",
            font: "400 13px/18px var(--font-sans)",
            color: "var(--ink-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {brand.tagline}
        </p>
        <p
          style={{
            margin: "8px 0 0",
            font: "700 14px/20px var(--font-sans)",
            color: "var(--red-500)",
          }}
        >
          {brand.foundingCost}
        </p>
      </div>
    </Link>
  );
}
