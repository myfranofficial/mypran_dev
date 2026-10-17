"use client";

import { useActionState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { ImageSpecGuide } from "../ui/image-spec-guide";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../ui/styles";

interface StoreFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  store?: {
    name: string;
    address: string | null;
    size: string | null;
    tables_count: number | null;
    phone: string | null;
    hours: string | null;
    features: string | null;
    image_url: string | null;
    is_new: number;
    is_active: number;
  };
}

/** DB에 JSON 배열로 저장된 features를 콤마 구분 텍스트로 변환 */
function featuresToText(raw: string | null): string {
  if (!raw) return "";
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.join(", ");
  } catch { /* not JSON */ }
  return raw;
}

export function StoreForm({ action, store }: StoreFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <ImageSpecGuide specs={[{ label: "매장 대표사진", size: "1200 x 900px", ratio: "4:3", note: "매장 카드에 표시" }]} />

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className={s.label}>매장명 *</label>
          <input id="name" name="name" required defaultValue={store?.name ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="address" className={s.label}>주소</label>
          <input id="address" name="address" defaultValue={store?.address ?? ""} className={s.input} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="size" className={s.label}>규모</label>
            <input id="size" name="size" defaultValue={store?.size ?? ""} className={s.input} placeholder="예: 120평" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="tables_count" className={s.label}>테이블 수</label>
            <input id="tables_count" name="tables_count" type="number" defaultValue={store?.tables_count ?? ""} className={s.input} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className={s.label}>전화번호</label>
            <input id="phone" name="phone" defaultValue={store?.phone ?? ""} className={s.input} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="hours" className={s.label}>영업시간</label>
          <input id="hours" name="hours" defaultValue={store?.hours ?? ""} className={s.input} placeholder="예: 10:00 ~ 02:00" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="features" className={s.label}>특징 (쉼표 구분)</label>
          <input id="features" name="features" defaultValue={featuresToText(store?.features ?? null)} className={s.input} placeholder="예: VIP 라운지, 주차 가능, 프로샵" />
          <p className="text-xs text-[#9E9F9C]">쉼표(,)로 구분하여 입력하세요. 예: VIP 라운지, 푸드존, 프로샵</p>
        </div>

        <ImageUploadField
          name="image_url"
          label="매장 이미지"
          aspect={16 / 9}
          maxWidth={1200}
          hintText="권장 비율 16:9"
          initialKey={store?.image_url ?? ""}
          initialUrl={store?.image_url ? imageUrl(store.image_url) : ""}
        />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input id="is_active" name="is_active" type="checkbox" defaultChecked={store ? !!store.is_active : true} value="1" className="h-4 w-4 accent-[#EF4023]" />
            <label htmlFor="is_active" className="text-sm text-[#585958]">활성화</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="is_new" name="is_new" type="checkbox" defaultChecked={store ? !!store.is_new : false} value="1" className="h-4 w-4 accent-[#EF4023]" />
            <label htmlFor="is_new" className="text-sm text-[#585958]">NEW 뱃지</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/stores" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
