"use client";

import { useActionState } from "react";
import * as s from "../ui/styles";

const CATEGORIES = ["이용안내", "멤버십", "창업", "시설", "기타"];

interface FaqFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  item?: {
    category: string | null;
    question: string;
    answer: string | null;
  };
}

export function FaqForm({ action, item }: FaqFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="category" className={s.label}>카테고리</label>
          <select id="category" name="category" defaultValue={item?.category ?? ""} className={s.input}>
            <option value="">선택 안 함</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="question" className={s.label}>질문 *</label>
          <input id="question" name="question" required defaultValue={item?.question ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="answer" className={s.label}>답변</label>
          <textarea id="answer" name="answer" rows={6} defaultValue={item?.answer ?? ""} className={s.textarea} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/faq" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
