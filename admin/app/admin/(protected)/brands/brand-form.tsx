"use client";

import { useActionState } from "react";
import type { BrandCategory } from "@/lib/db/brands";
import { ImageUploadField } from "../ui/image-upload-field";
import * as s from "../ui/styles";

interface Props {
  action: (prev: any, formData: FormData) => Promise<{ error: string } | undefined>;
  defaultValues?: {
    category_id?: number | null;
    name?: string;
    tagline?: string;
    description?: string;
    founding_cost?: string;
    store_count?: number;
    logo_url?: string;
    main_image_url?: string;
    images?: string;
    features?: string;
    phone?: string;
    kakao_url?: string;
    is_featured?: number;
    is_active?: number;
  };
  categories: BrandCategory[];
}

export function BrandForm({ action, defaultValues: d = {}, categories }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errBox}>{state.error}</div>}

      {/* 기본 정보 */}
      <div className={s.card}>
        <h2 className={s.cardTitle}>기본 정보</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={s.label}>브랜드명 *</label>
              <input name="name" defaultValue={d.name} required className={s.input} placeholder="예: 국밥마을" />
            </div>
            <div>
              <label className={s.label}>업종 카테고리</label>
              <select name="category_id" defaultValue={d.category_id ?? ""} className={s.input}>
                <option value="">-- 선택 --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={s.label}>한 줄 소개 (tagline)</label>
            <input name="tagline" defaultValue={d.tagline} className={s.input} placeholder="예: 전통의 맛으로 만드는 성공 창업" />
          </div>

          <div>
            <label className={s.label}>상세 설명</label>
            <textarea name="description" defaultValue={d.description} rows={5} className={s.textarea}
              placeholder="브랜드 소개, 특징, 강점 등을 자세히 입력하세요" />
          </div>
        </div>
      </div>

      {/* 창업 정보 */}
      <div className={s.card}>
        <h2 className={s.cardTitle}>창업 정보</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={s.label}>창업비용</label>
            <input name="founding_cost" defaultValue={d.founding_cost} className={s.input} placeholder="예: 5,000만원~" />
          </div>
          <div>
            <label className={s.label}>가맹점 수</label>
            <input name="store_count" type="number" defaultValue={d.store_count ?? 0} className={s.input} min={0} />
          </div>
          <div>
            <label className={s.label}>상담 전화</label>
            <input name="phone" defaultValue={d.phone} className={s.input} placeholder="예: 010-0000-0000" />
          </div>
          <div>
            <label className={s.label}>카카오 채널 URL</label>
            <input name="kakao_url" defaultValue={d.kakao_url} className={s.input} placeholder="https://pf.kakao.com/..." />
          </div>
        </div>

        <div className="mt-4">
          <label className={s.label}>주요 특징 (줄바꿈으로 구분)</label>
          <textarea name="features" defaultValue={
            d.features ? JSON.parse(d.features).join("\n") : ""
          } rows={4} className={s.textarea}
            placeholder={"24시간 운영 가능\n본사 직영 교육 지원\n물류 시스템 완비"} />
          <p className={s.hint}>각 줄이 하나의 특징으로 등록됩니다</p>
        </div>
      </div>

      {/* 이미지 */}
      <div className={s.card}>
        <h2 className={s.cardTitle}>이미지</h2>
        <div className="space-y-4">
          <ImageUploadField name="logo_url" label="로고 이미지" initialKey={d.logo_url ?? ""} initialUrl={d.logo_url ?? ""} maxWidth={400} />
          <ImageUploadField name="main_image_url" label="대표 이미지" initialKey={d.main_image_url ?? ""} initialUrl={d.main_image_url ?? ""} />
          <div>
            <label className={s.label}>추가 매장 사진 URL (줄바꿈으로 구분)</label>
            <textarea name="images_raw" defaultValue={
              d.images ? JSON.parse(d.images).join("\n") : ""
            } rows={4} className={s.textarea} placeholder="이미지 URL을 줄바꿈으로 구분하여 입력" />
            <p className={s.hint}>어드민 업로더로 올린 URL 또는 외부 URL을 입력하세요</p>
          </div>
        </div>
      </div>

      {/* 상태 */}
      <div className={s.card}>
        <h2 className={s.cardTitle}>노출 설정</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_active" defaultChecked={d.is_active !== 0} className="h-4 w-4" />
            <span className="text-sm">활성 (브랜드 목록에 표시)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_featured" defaultChecked={!!d.is_featured} className="h-4 w-4" />
            <span className="text-sm">추천 브랜드 (메인 페이지 우선 노출)</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/brands" className={s.btnSecondary}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
