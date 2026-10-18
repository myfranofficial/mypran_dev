"use client";

import { useState, useActionState, useRef } from "react";
import * as s from "../ui/styles";

const CATEGORIES = ["공지", "이벤트", "안내", "기타"];

interface NoticeFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  notice?: {
    category: string | null;
    title: string;
    content: string | null;
    date: string | null;
    is_pinned: number;
    is_active: number;
    attachment_url: string | null;
    attachment_name: string | null;
  };
}

export function NoticeForm({ action, notice }: NoticeFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const attachUrlRef = useRef<HTMLInputElement>(null);
  const attachNameRef = useRef<HTMLInputElement>(null);

  async function handleAttachUpload(e: React.ChangeEvent<HTMLInputElement>) {
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

      if (attachUrlRef.current) {
        attachUrlRef.current.value = data.url || data.key;
      }
      if (attachNameRef.current) {
        attachNameRef.current.value = data.filename || file.name;
      }
    } catch {
      setUploadError("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  }

  function clearAttachment() {
    if (attachUrlRef.current) attachUrlRef.current.value = "";
    if (attachNameRef.current) attachNameRef.current.value = "";
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목 *</label>
          <input id="title" name="title" required defaultValue={notice?.title ?? ""} className={s.input} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="category" className={s.label}>카테고리</label>
            <select id="category" name="category" defaultValue={notice?.category ?? ""} className={s.input}>
              <option value="">선택 안 함</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="date" className={s.label}>날짜</label>
            <input id="date" name="date" type="date" defaultValue={notice?.date ?? ""} className={s.input} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="content" className={s.label}>내용</label>
          <textarea id="content" name="content" rows={10} defaultValue={notice?.content ?? ""} className={s.textarea} />
        </div>

        {/* 첨부파일 */}
        <div className="space-y-1.5">
          <label className={s.label}>첨부파일</label>
          <input
            type="file"
            accept=".pdf,.zip,.docx,.doc,.hwp,.xlsx,.xls,.pptx,.ppt,.txt,.csv,.jpg,.jpeg,.png,.webp"
            onChange={handleAttachUpload}
            disabled={uploading}
            className="block w-full text-sm text-[#585958] file:mr-3 file:rounded file:border-0 file:bg-[#F5F5F5] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#585958] hover:file:bg-[#E5E7EA]"
          />
          {uploading && <p className="text-xs text-[#EF4023]">업로드 중...</p>}
          {uploadError && <p className="text-xs text-[#E03A1E]">{uploadError}</p>}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <label htmlFor="attachment_name" className="text-xs text-[#9E9F9C]">첨부파일명</label>
              <input ref={attachNameRef} id="attachment_name" name="attachment_name" defaultValue={notice?.attachment_name ?? ""} className={s.input} placeholder="예: 공지_첨부.pdf" />
            </div>
            <div className="space-y-1">
              <label htmlFor="attachment_url" className="text-xs text-[#9E9F9C]">첨부파일 URL</label>
              <input ref={attachUrlRef} id="attachment_url" name="attachment_url" defaultValue={notice?.attachment_url ?? ""} className={s.input} placeholder="업로드 시 자동 입력" />
            </div>
          </div>
          {notice?.attachment_name && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#585958]">현재 첨부: {notice.attachment_name}</span>
              <button type="button" onClick={clearAttachment} className="text-xs text-[#E03A1E] hover:underline">삭제</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              defaultChecked={notice ? !!notice.is_active : true}
              value="1"
              className="h-4 w-4 accent-[#EF4023]"
            />
            <label htmlFor="is_active" className="text-sm text-[#585958]">활성화</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="is_pinned"
              name="is_pinned"
              type="checkbox"
              defaultChecked={notice ? !!notice.is_pinned : false}
              value="1"
              className="h-4 w-4 accent-[#EF4023]"
            />
            <label htmlFor="is_pinned" className="text-sm text-[#585958]">상단 고정</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/notices" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending || uploading} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
