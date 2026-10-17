"use client";

import { useActionState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { ImageSpecGuide } from "../ui/image-spec-guide";
import { FieldHint } from "../ui/preview-link";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../ui/styles";

interface PopupFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  popup?: {
    title: string;
    image_url: string;
    link_url: string | null;
    link_text: string | null;
    position: string;
    start_at: string | null;
    end_at: string | null;
    is_active: number;
  };
}

export function PopupForm({ action, popup }: PopupFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      {/* 안내 박스 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        <strong>팝업은 메인 페이지 접속 시 중앙에 표시됩니다.</strong>
        <br />&quot;오늘 다시 보지 않기&quot; 기능이 자동 적용됩니다.
      </div>

      {/* 이미지 규격 안내 */}
      <ImageSpecGuide
        specs={[
          {
            label: "팝업 이미지",
            size: "800 x 1400px",
            ratio: "가로:세로 = 4:7",
            note: "세로 포스터형 이미지에 최적화",
          },
        ]}
      />

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목 *</label>
          <input
            id="title"
            name="title"
            required
            defaultValue={popup?.title ?? ""}
            className={s.input}
            placeholder="예: 제1회 하이큐빌리어드배 대회"
          />
          <FieldHint text="팝업 이미지의 대체 텍스트(alt)로도 사용됩니다" />
        </div>

        <ImageUploadField
          name="image_url"
          label="팝업 이미지"
          required
          aspect={4 / 7}
          maxWidth={800}
          hintText="권장 800×1400px (4:7 비율) · 세로 포스터형"
          initialKey={popup?.image_url ?? ""}
          initialUrl={popup?.image_url ? imageUrl(popup.image_url) : ""}
        />

        <div className="space-y-1.5">
          <label htmlFor="link_text" className={s.label}>버튼 텍스트</label>
          <input
            id="link_text"
            name="link_text"
            defaultValue={popup?.link_text ?? "자세히 보기"}
            className={s.input}
          />
          <FieldHint text="팝업 하단 버튼에 표시될 텍스트 (기본: 자세히 보기)" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="link_url" className={s.label}>링크 URL</label>
          <input
            id="link_url"
            name="link_url"
            defaultValue={popup?.link_url ?? ""}
            className={s.input}
            placeholder="https:// 또는 #tournament-form"
          />
          <FieldHint text="버튼 클릭 시 이동할 주소 · #tournament-form 입력 시 대회 신청 폼 연결" />
        </div>

        <input type="hidden" name="position" value={popup?.position ?? "center"} />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="start_at" className={s.label}>게시 시작</label>
            <input id="start_at" name="start_at" type="date" defaultValue={popup?.start_at ?? ""} className={s.input} />
            <FieldHint text="비워두면 즉시 게시" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="end_at" className={s.label}>게시 종료</label>
            <input id="end_at" name="end_at" type="date" defaultValue={popup?.end_at ?? ""} className={s.input} />
            <FieldHint text="비워두면 무기한 게시" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            defaultChecked={popup ? !!popup.is_active : true}
            value="1"
            className="h-4 w-4 accent-[#EF4023]"
          />
          <label htmlFor="is_active" className="text-sm text-[#585958]">활성화</label>
          <span className="text-xs text-[#B0B0B0]">— 체크 해제 시 메인 페이지에서 숨김</span>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/popups" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
