"use client";

import { useActionState } from "react";
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
  };
}

export function NoticeForm({ action, notice }: NoticeFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

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
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
