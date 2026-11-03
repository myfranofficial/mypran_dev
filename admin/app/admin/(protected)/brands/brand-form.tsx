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
    tier?: string;
    tagline?: string;
    description?: string;
    founding_cost?: string;
    founding_cost_min?: number;
    listing_fee?: number;
    store_count?: number;
    store_type?: string;
    logo_url?: string;
    main_image_url?: string;
    images?: string;
    features?: string;
    cost_breakdown?: string;
    franchise_fee?: string;
    education_fee?: string;
    royalty?: string;
    standard_area?: string;
    vat_included?: number;
    deposit_included?: number;
    startup_process?: string;
    headquarters?: string;
    phone?: string;
    kakao_url?: string;
    is_featured?: number;
    is_active?: number;
  };
  categories: BrandCategory[];
}

function parseJsonLines(json: string | undefined | null): string {
  if (!json) return "";
  try { return JSON.parse(json).join("\n"); } catch { return ""; }
}

function parseCostBreakdown(json: string | undefined | null): string {
  if (!json) return "";
  try {
    return JSON.parse(json).map((c: { label: string; value: string }) => `${c.label}: ${c.value}`).join("\n");
  } catch { return ""; }
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            <div>
              <label className={s.label}>등급 (tier)</label>
              <select name="tier" defaultValue={d.tier ?? "special"} className={s.input}>
                <option value="best">베스트</option>
                <option value="premium">프리미엄</option>
                <option value="special">스페셜</option>
              </select>
            </div>
          </div>

          <div>
            <label className={s.label}>한 줄 소개 (tagline)</label>
            <input name="tagline" defaultValue={d.tagline} className={s.input} placeholder="예: 전통의 맛으로 만드는 성공 창업" />
          </div>

          <div>
            <label className={s.label}>상세 설명</label>
            <textarea name="description" defaultValue={d.description} rows={4} className={s.textarea}
              placeholder="브랜드 소개, 특징, 강점 등을 자세히 입력하세요" />
          </div>
        </div>
      </div>

      {/* 창업 정보 */}
      <div className={s.card}>
        <h2 className={s.cardTitle}>창업 정보</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={s.label}>창업비용 (텍스트)</label>
            <input name="founding_cost" defaultValue={d.founding_cost} className={s.input} placeholder="예: 3,000만원~5,000만원" />
          </div>
          <div>
            <label className={s.label}>최소 창업비 (만원)</label>
            <input name="founding_cost_min" type="number" defaultValue={d.founding_cost_min ?? 0} className={s.input} min={0} />
          </div>
          <div>
            <label className={s.label}>입점비 (만원/월)</label>
            <input name="listing_fee" type="number" defaultValue={d.listing_fee ?? 0} className={s.input} min={0} />
          </div>
          <div>
            <label className={s.label}>가맹점 수</label>
            <input name="store_count" type="number" defaultValue={d.store_count ?? 0} className={s.input} min={0} />
          </div>
          <div>
            <label className={s.label}>매장 형태</label>
            <select name="store_type" defaultValue={d.store_type ?? "hall"} className={s.input}>
              <option value="hall">홀 매장</option>
              <option value="delivery">배달 전문</option>
              <option value="unmanned">무인 매장</option>
              <option value="shopinshop">샵인샵</option>
              <option value="convert">업종 변경</option>
            </select>
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

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={s.label}>가맹비</label>
            <input name="franchise_fee" defaultValue={d.franchise_fee} className={s.input} placeholder="예: 500만원" />
          </div>
          <div>
            <label className={s.label}>교육비</label>
            <input name="education_fee" defaultValue={d.education_fee} className={s.input} placeholder="예: 200만원" />
          </div>
          <div>
            <label className={s.label}>로열티</label>
            <input name="royalty" defaultValue={d.royalty} className={s.input} placeholder="예: 월 20만원" />
          </div>
          <div>
            <label className={s.label}>기준 면적</label>
            <input name="standard_area" defaultValue={d.standard_area} className={s.input} placeholder="예: 10~15평" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="vat_included" defaultChecked={!!d.vat_included} className="h-4 w-4" />
            <span className="text-sm">VAT 포함</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="deposit_included" defaultChecked={!!d.deposit_included} className="h-4 w-4" />
            <span className="text-sm">보증금 포함</span>
          </label>
        </div>

        <div className="mt-4">
          <label className={s.label}>비용 항목 (줄바꿈으로 구분, 형식: 항목명: 금액)</label>
          <textarea name="cost_breakdown_raw" defaultValue={parseCostBreakdown(d.cost_breakdown)} rows={4} className={s.textarea}
            placeholder={"가맹비: 500만원\n교육비: 200만원\n인테리어: 1,500만원~\n장비·집기: 500만원~"} />
          <p className={s.hint}>각 줄을 &quot;항목명: 금액&quot; 형식으로 입력하세요</p>
        </div>

        <div className="mt-4">
          <label className={s.label}>주요 특징 (줄바꿈으로 구분)</label>
          <textarea name="features" defaultValue={parseJsonLines(d.features)} rows={4} className={s.textarea}
            placeholder={"24시간 운영 가능\n본사 직영 교육 지원\n물류 시스템 완비"} />
          <p className={s.hint}>각 줄이 하나의 특징으로 등록됩니다</p>
        </div>

        <div className="mt-4">
          <label className={s.label}>창업 절차 (줄바꿈으로 구분)</label>
          <textarea name="startup_process_raw" defaultValue={parseJsonLines(d.startup_process)} rows={4} className={s.textarea}
            placeholder={"가맹 문의 및 상담\n사업 설명회 참석\n가맹 계약 체결\n상권 분석 및 입지 선정"} />
        </div>

        <div className="mt-4">
          <label className={s.label}>본사 지원 (줄바꿈으로 구분)</label>
          <textarea name="headquarters_raw" defaultValue={parseJsonLines(d.headquarters)} rows={3} className={s.textarea}
            placeholder={"식재료 공급\n레시피 교육\n매장 운영 컨설팅"} />
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
            <textarea name="images_raw" defaultValue={parseJsonLines(d.images)} rows={4} className={s.textarea} placeholder="이미지 URL을 줄바꿈으로 구분하여 입력" />
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
