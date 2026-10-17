"use client";

import { useActionState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { ImageSpecGuide } from "../ui/image-spec-guide";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../ui/styles";

const STATUS_OPTIONS = [
  { value: "upcoming", label: "예정" },
  { value: "active", label: "진행중" },
  { value: "ended", label: "종료" },
];

interface EventFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  event?: {
    title: string;
    description: string | null;
    image_url: string | null;
    start_date: string | null;
    end_date: string | null;
    status: string;
    is_active: number;
  };
}

export function EventForm({ action, event }: EventFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <ImageSpecGuide specs={[{ label: "이벤트 이미지", size: "1200 x 900px", ratio: "4:3", note: "이벤트 카드에 표시" }]} />

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목 *</label>
          <input id="title" name="title" required defaultValue={event?.title ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className={s.label}>설명</label>
          <textarea id="description" name="description" rows={5} defaultValue={event?.description ?? ""} className={s.textarea} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="start_date" className={s.label}>시작일</label>
            <input id="start_date" name="start_date" type="date" defaultValue={event?.start_date ?? ""} className={s.input} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="end_date" className={s.label}>종료일</label>
            <input id="end_date" name="end_date" type="date" defaultValue={event?.end_date ?? ""} className={s.input} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="status" className={s.label}>상태</label>
            <select id="status" name="status" defaultValue={event?.status ?? "active"} className={s.input}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <ImageUploadField
          name="image_url"
          label="이벤트 이미지"
          aspect={16 / 9}
          maxWidth={1200}
          hintText="권장 비율 16:9"
          initialKey={event?.image_url ?? ""}
          initialUrl={event?.image_url ? imageUrl(event.image_url) : ""}
        />

        <div className="flex items-center gap-2">
          <input id="is_active" name="is_active" type="checkbox" defaultChecked={event ? !!event.is_active : true} value="1" className="h-4 w-4 accent-[#EF4023]" />
          <label htmlFor="is_active" className="text-sm text-[#585958]">활성화</label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/events" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
