"use client";

import { useActionState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { imageUrl } from "@/lib/storage";
import * as s from "../ui/styles";

interface BannerFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  banner?: {
    image_url: string;
    image_url_mobile: string | null;
    link_url: string | null;
    title: string | null;
    subtitle: string | null;
    start_at: string | null;
    end_at: string | null;
    is_active: number;
  };
}

export function BannerForm({ action, banner }: BannerFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목</label>
          <input id="title" name="title" defaultValue={banner?.title ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="subtitle" className={s.label}>부제목</label>
          <input id="subtitle" name="subtitle" defaultValue={banner?.subtitle ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="link_url" className={s.label}>링크 URL</label>
          <input id="link_url" name="link_url" defaultValue={banner?.link_url ?? ""} className={s.input} placeholder="https://" />
        </div>

        <ImageUploadField
          name="image_url"
          label="PC 배너 이미지"
          required
          aspect={16 / 9}
          maxWidth={1920}
          hintText="권장 비율 16:9, 최대 1920px"
          initialKey={banner?.image_url ?? ""}
          initialUrl={banner?.image_url ? imageUrl(banner.image_url) : ""}
        />

        <ImageUploadField
          name="image_url_mobile"
          label="모바일 배너 이미지 (선택)"
          aspect={9 / 16}
          maxWidth={800}
          hintText="권장 비율 9:16. 미등록 시 PC 이미지 사용"
          initialKey={banner?.image_url_mobile ?? ""}
          initialUrl={banner?.image_url_mobile ? imageUrl(banner.image_url_mobile) : ""}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="start_at" className={s.label}>게시 시작</label>
            <input id="start_at" name="start_at" type="date" defaultValue={banner?.start_at ?? ""} className={s.input} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="end_at" className={s.label}>게시 종료</label>
            <input id="end_at" name="end_at" type="date" defaultValue={banner?.end_at ?? ""} className={s.input} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            defaultChecked={banner ? !!banner.is_active : true}
            value="1"
            className="h-4 w-4 accent-[#EF4023]"
          />
          <label htmlFor="is_active" className="text-sm text-[#585958]">활성화</label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/banners" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
