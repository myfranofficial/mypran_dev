/** SVG icons used across the site. All accept className for sizing/color. */

type IconProps = {
  size?: number;
  className?: string;
  fill?: string;
  "aria-hidden"?: boolean;
};

const defaults: IconProps = { size: 24, "aria-hidden": true };

function svg(
  props: IconProps,
  d: string,
  { viewBox = "0 0 24 24", fillRule }: { viewBox?: string; fillRule?: boolean } = {}
) {
  const { size, className, fill = "currentColor", ...rest } = {
    ...defaults,
    ...props,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...rest}
    >
      <path d={d} fillRule={fillRule ? "evenodd" : undefined} />
    </svg>
  );
}

export function PhoneIcon(p: IconProps) {
  return svg(
    p,
    "M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"
  );
}

export function ChatIcon(p: IconProps) {
  return svg(p, "M4 4h16v12H8l-4 4z");
}

export function ChevronRight(p: IconProps) {
  const { size = 16, className } = p;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className={className}
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function CrownIcon(p: IconProps) {
  return svg(p, "M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z");
}

export function StarIcon(p: IconProps) {
  return svg(
    p,
    "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
  );
}

export function PeopleIcon(p: IconProps) {
  return svg(
    p,
    "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm7 0a3 3 0 100-6 3 3 0 000 6zM2 19c0-3.3 3.1-6 7-6s7 2.7 7 6v1H2zm15.5-6c2.8.3 4.5 2.4 4.5 5v2h-4v-1c0-2.4-.9-4.4-2.5-5.6z"
  );
}

export function ChartIcon(p: IconProps) {
  return svg(p, "M4 20h16v2H4zM5 13h3v6H5zm5-4h3v10h-3zm5-5h3v15h-3z");
}

export function HomeIcon(p: IconProps) {
  return svg(p, "M4 21V8l8-5 8 5v13h-6v-6h-4v6z");
}

export function MonitorIcon(p: IconProps) {
  return svg(
    p,
    "M3 4h18v12H3V4zm2 2v8h14V6H5zM9 18h6v2H9z",
    { fillRule: true }
  );
}

export function ShieldIcon(p: IconProps) {
  return svg(
    p,
    "M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-1.2 13.2l5.7-5.7-1.4-1.4-4.3 4.3-2.1-2.1-1.4 1.4 3.5 3.5z",
    { fillRule: true }
  );
}

export function TrophyIcon(p: IconProps) {
  return svg(
    p,
    "M7 3h10v2h3v3a4 4 0 01-4 4h-.3A5 5 0 0113 14.9V18h3v3H8v-3h3v-3.1A5 5 0 018.3 12H8a4 4 0 01-4-4V5h3V3zm0 4H6v1a2 2 0 001 1.7V7zm10 0v2.7A2 2 0 0018 8V7h-1z",
    { fillRule: true }
  );
}

export function SpeakerIcon(p: IconProps) {
  return svg(
    p,
    "M3 10v4h3l6 4V6l-6 4H3zm13 2a4 4 0 00-2-3.46v6.92A4 4 0 0016 12zm-2-8v2.06a6 6 0 010 11.88V20a8 8 0 000-16z"
  );
}

export function BookIcon(p: IconProps) {
  return svg(
    p,
    "M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zm16 0h-5a2 2 0 00-2 2v14a2 2 0 012-2h5z"
  );
}

export function FileIcon(p: IconProps) {
  return svg(
    p,
    "M6 2h8l5 5v15H6V2zm2 10v2h8v-2H8zm0 4v2h8v-2H8z",
    { fillRule: true }
  );
}

export function MailIcon(p: IconProps) {
  return svg(
    p,
    "M2 5h20v14H2V5zm2.4 2L12 12l7.6-5H4.4z",
    { fillRule: true }
  );
}

export function SearchIcon(p: IconProps) {
  return svg(
    p,
    "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
  );
}

export function CloseIcon(p: IconProps) {
  return svg(p, "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
}

export function CompareIcon(p: IconProps) {
  return svg(p, "M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v6l-5-6v14h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z");
}

export function DownloadIcon(p: IconProps) {
  return svg(p, "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z");
}

export function ClockIcon(p: IconProps) {
  return svg(p, "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z");
}

export function CheckCircleIcon(p: IconProps) {
  return svg(p, "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");
}
