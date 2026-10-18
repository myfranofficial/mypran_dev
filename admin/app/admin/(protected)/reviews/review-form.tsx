"use client";

import { useActionState } from "react";
import * as s from "../ui/styles";

interface ReviewFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  review?: {
    author: string;
    rating: number;
    content: string | null;
    is_active: number;
  };
}

export function ReviewForm({ action, review }: ReviewFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="author" className={s.label}>작성자명 *</label>
            <input id="author" name="author" required defaultValue={review?.author ?? ""} className={s.input} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="rating" className={s.label}>별점 *</label>
            <select id="rating" name="rating" defaultValue={review?.rating ?? 5} className={s.input}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{"★".repeat(r)}{"☆".repeat(5 - r)} ({r}점)</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="content" className={s.label}>후기 내용</label>
          <textarea id="content" name="content" rows={5} defaultValue={review?.content ?? ""} className={s.textarea} />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            defaultChecked={review ? !!review.is_active : true}
            value="1"
            className="h-4 w-4 accent-[#EF4023]"
          />
          <label htmlFor="is_active" className="text-sm text-[#585958]">노출</label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/reviews" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
