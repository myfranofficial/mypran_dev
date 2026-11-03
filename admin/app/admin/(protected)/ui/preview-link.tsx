"use client";

const SITE_URL = "https://xn--lj2b54b90v2gn.kr";

interface PreviewLinkProps {
  /** Frontend path, e.g. "/" or "/stores" */
  path: string;
  label?: string;
}

export function PreviewLink({ path, label }: PreviewLinkProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EA] bg-white px-3 py-1.5 text-sm font-medium text-[#585958] transition hover:border-[#EF4023] hover:text-[#EF4023]"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {label || "실제 페이지 보기"}
    </a>
  );
}

interface PreviewIframeProps {
  path: string;
  show: boolean;
}

export function PreviewIframe({ path, show }: PreviewIframeProps) {
  if (!show) return null;
  const url = `${SITE_URL}${path}`;
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-[#E5E7EA]">
      <div className="flex items-center justify-between bg-[#F5F5F5] px-4 py-2">
        <span className="text-xs font-medium text-[#585958]">미리보기</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#EF4023] hover:underline">
          새 탭에서 열기 ↗
        </a>
      </div>
      <iframe
        src={url}
        className="h-[600px] w-full border-0"
        title="프론트 미리보기"
      />
    </div>
  );
}

export function FieldHint({ text }: { text: string }) {
  return (
    <p className="mt-0.5 text-xs text-[#B0B0B0]">
      <span className="mr-1">💡</span>{text}
    </p>
  );
}
