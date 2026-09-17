"use client";

import { useActionState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { FieldHint } from "../ui/preview-link";
import { imageUrl } from "@/lib/storage/url";
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

      {/* 안내 박스 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        <strong>배너는 메인 페이지 최상단 히어로 슬라이더에 표시됩니다.</strong>
        <br />PC와 모바일에서 각각 다른 이미지를 보여줄 수 있으며, 활성화된 배너만 노출됩니다.
      </div>

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목</label>
          <input id="title" name="title" defaultValue={banner?.title ?? ""} className={s.input} />
          <FieldHint text="슬라이더 위에 큰 글씨로 표시됩니다 (선택사항)" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="subtitle" className={s.label}>부제목</label>
          <input id="subtitle" name="subtitle" defaultValue={banner?.subtitle ?? ""} className={s.input} />
          <FieldHint text="제목 아래에 작은 글씨로 표시됩니다 (선택사항)" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="link_url" className={s.label}>링크 URL</label>
          <input id="link_url" name="link_url" defaultValue={banner?.link_url ?? ""} className={s.input} placeholder="https://" />
          <FieldHint text="배너 클릭 시 이동할 페이지 주소 (선택사항)" />
        </div>

        <ImageUploadField
          name="image_url"
          label="PC 배너 이미지"
          required
          aspect={16 / 9}
          maxWidth={1920}
          hintText="권장 비율 16:9, 최대 1920px · 메인 페이지 전체 너비로 표시"
          initialKey={banner?.image_url ?? ""}
          initialUrl={banner?.image_url ? imageUrl(banner.image_url) : ""}
        />

        <ImageUploadField
          name="image_url_mobile"
          label="모바일 배너 이미지 (선택)"
          aspect={9 / 16}
          maxWidth={800}
          hintText="권장 비율 9:16 · 미등록 시 PC 이미지가 모바일에서도 사용됩니다"
          initialKey={banner?.image_url_mobile ?? ""}
          initialUrl={banner?.image_url_mobile ? imageUrl(banner.image_url_mobile) : ""}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="start_at" className={s.label}>게시 시작</label>
            <input id="start_at" name="start_at" type="date" defaultValue={banner?.start_at ?? ""} className={s.input} />
            <FieldHint text="비워두면 즉시 게시" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="end_at" className={s.label}>게시 종료</label>
            <input id="end_at" name="end_at" type="date" defaultValue={banner?.end_at ?? ""} className={s.input} />
            <FieldHint text="비워두면 무기한 게시" />
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
          <span className="text-xs text-[#B0B0B0]">— 체크 해제 시 메인 페이지에서 숨김</span>
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
