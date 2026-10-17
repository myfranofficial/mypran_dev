"use client";

import { useActionState } from "react";
import * as s from "../ui/styles";

interface DownloadFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  item?: {
    title: string;
    description: string | null;
    filename: string | null;
    file_url: string | null;
    file_size: string | null;
  };
}

export function DownloadForm({ action, item }: DownloadFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목 *</label>
          <input id="title" name="title" required defaultValue={item?.title ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className={s.label}>설명</label>
          <textarea id="description" name="description" rows={3} defaultValue={item?.description ?? ""} className={s.textarea} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="filename" className={s.label}>파일명</label>
            <input id="filename" name="filename" defaultValue={item?.filename ?? ""} className={s.input} placeholder="예: 사업제안서.pdf" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="file_size" className={s.label}>파일 크기</label>
            <input id="file_size" name="file_size" defaultValue={item?.file_size ?? ""} className={s.input} placeholder="예: 2.5MB" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="file_url" className={s.label}>파일 URL *</label>
          <input id="file_url" name="file_url" required defaultValue={item?.file_url ?? ""} className={s.input} placeholder="/uploads/파일명 또는 외부 URL" />
          <p className="text-xs text-[#9E9F9C]">이미지 업로드 후 반환된 경로를 입력하거나 외부 URL 사용</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/downloads" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
