/** MF logo with brand text */
import Image from "next/image";

type LogoProps = {
  /** Logo height */
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
  return (
    <span
      className={className}
      style={{ display: "flex", alignItems: "center", gap: 10 }}
    >
      <Image
        src="/logo.png"
        alt="마이프랜"
        width={iconSize >= 34 ? 180 : 140}
        height={iconSize >= 34 ? 50 : 40}
        style={{ objectFit: "contain" }}
        priority
      />
    </span>
  );
}
