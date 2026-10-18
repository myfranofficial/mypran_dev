"use client";

import { useState, useActionState, useRef } from "react";
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const filenameRef = useRef<HTMLInputElement>(null);
  const fileSizeRef = useRef<HTMLInputElement>(null);
  const fileUrlRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "업로드에 실패했습니다.");
        return;
      }

      // 자동으로 필드 채우기
      if (fileUrlRef.current) {
        fileUrlRef.current.value = data.url || data.key;
      }
      if (filenameRef.current && data.filename) {
        filenameRef.current.value = data.filename;
      }
      if (fileSizeRef.current && data.fileSize) {
        fileSizeRef.current.value = data.fileSize;
      }
    } catch {
      setUploadError("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  }

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

        {/* 파일 업로드 */}
        <div className="space-y-1.5">
          <label className={s.label}>파일 업로드</label>
          <input
            type="file"
            accept=".pdf,.zip,.docx,.doc,.hwp,.xlsx,.xls,.pptx,.ppt,.txt,.csv"
            onChange={handleFileUpload}
            disabled={uploading}
            className="block w-full text-sm text-[#585958] file:mr-3 file:rounded file:border-0 file:bg-[#F5F5F5] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#585958] hover:file:bg-[#E5E7EA]"
          />
          <p className="text-xs text-[#9E9F9C]">
            PDF, ZIP, DOCX, HWP, XLSX, PPTX, TXT, CSV (최대 50MB). 업로드하면 아래 필드가 자동으로 채워집니다.
          </p>
          {uploading && <p className="text-xs text-[#EF4023]">업로드 중...</p>}
          {uploadError && <p className="text-xs text-[#E03A1E]">{uploadError}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="filename" className={s.label}>파일명</label>
            <input ref={filenameRef} id="filename" name="filename" defaultValue={item?.filename ?? ""} className={s.input} placeholder="예: 사업제안서.pdf" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="file_size" className={s.label}>파일 크기</label>
            <input ref={fileSizeRef} id="file_size" name="file_size" defaultValue={item?.file_size ?? ""} className={s.input} placeholder="예: 2.5MB" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="file_url" className={s.label}>파일 URL *</label>
          <input ref={fileUrlRef} id="file_url" name="file_url" required defaultValue={item?.file_url ?? ""} className={s.input} placeholder="/uploads/파일명 또는 외부 URL" />
          <p className="text-xs text-[#9E9F9C]">파일을 업로드하면 자동으로 채워지거나, 외부 URL을 직접 입력할 수 있습니다.</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/downloads" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending || uploading} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
