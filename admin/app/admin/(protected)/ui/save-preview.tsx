"use client";

import { useState } from "react";
import { PreviewIframe } from "./preview-link";

interface SavePreviewProps {
  /** Frontend path to preview after save */
  previewPath: string;
  /** Was the form just saved? (from searchParams msg=saved) */
  saved: boolean;
}

export function SavePreview({ previewPath, saved }: SavePreviewProps) {
  const [showPreview, setShowPreview] = useState(saved);

  if (!saved && !showPreview) return null;

  return (
    <div className="mt-4">
      {saved && !showPreview && (
        <button
          onClick={() => setShowPreview(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#EF4023] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d63820]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          저장 결과 미리보기
        </button>
      )}
      <PreviewIframe path={previewPath} show={showPreview} />
    </div>
  );
}
