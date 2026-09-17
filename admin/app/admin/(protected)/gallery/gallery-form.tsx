"use client";

import { useActionState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../ui/styles";

const CATEGORIES = ["매장", "인테리어", "이벤트", "기타"];

interface GalleryFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  image?: {
    title: string | null;
    category: string | null;
    branch: string | null;
    image_url: string;
  };
}

export function GalleryForm({ action, image }: GalleryFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목</label>
          <input id="title" name="title" defaultValue={image?.title ?? ""} className={s.input} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="category" className={s.label}>카테고리</label>
            <select id="category" name="category" defaultValue={image?.category ?? ""} className={s.input}>
              <option value="">선택 안 함</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="branch" className={s.label}>매장명</label>
            <input id="branch" name="branch" defaultValue={image?.branch ?? ""} className={s.input} placeholder="예: 강남점" />
          </div>
        </div>

        <ImageUploadField
          name="image_url"
          label="갤러리 이미지"
          required
          aspect={4 / 3}
          maxWidth={1200}
          hintText="권장 비율 4:3, 최대 1200px"
          initialKey={image?.image_url ?? ""}
          initialUrl={image?.image_url ? imageUrl(image.image_url) : ""}
        />
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/gallery" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
