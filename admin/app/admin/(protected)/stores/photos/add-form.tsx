"use client";

import { ImageUploadField } from "../../ui/image-upload-field";
import { ImageSpecGuide } from "../../ui/image-spec-guide";
import * as s from "../../ui/styles";

interface StorePhotoAddFormProps {
  storeId: number;
  action: (formData: FormData) => void;
}

export function StorePhotoAddForm({ storeId, action }: StorePhotoAddFormProps) {
  return (
    <div className="rounded-lg border border-[#E5E7EA] bg-white p-5 space-y-4">
      <h2 className="text-lg font-semibold text-[#111827]">사진 추가</h2>

      <ImageSpecGuide
        specs={[
          { label: "매장 사진", size: "1200 x 900px", ratio: "4:3", note: "갤러리와 매장 카드에 함께 표시" },
        ]}
      />

      <form action={action} className="space-y-4">
        <input type="hidden" name="store_id" value={storeId} />

        <div className="space-y-1.5">
          <label htmlFor="photo_title" className={s.label}>제목 (선택)</label>
          <input id="photo_title" name="title" className={s.input} placeholder="예: 외관 사진, VIP룸" />
        </div>

        <ImageUploadField
          name="image_url"
          label="매장 사진"
          required
          aspect={4 / 3}
          allowFreeRatio
          maxWidth={1200}
          hintText="권장 1200×900px (4:3) · 원본 비율도 사용 가능"
          initialKey=""
          initialUrl=""
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" id="is_representative" name="is_representative" value="1" className="h-4 w-4 accent-[#EF4023]" />
          <label htmlFor="is_representative" className="text-sm text-[#374151]">대표사진으로 설정</label>
        </div>

        <div className="flex justify-end">
          <button type="submit" className={s.btnPrimary}>추가</button>
        </div>
      </form>
    </div>
  );
}
