"use client";

import { useState } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import * as s from "../ui/styles";
import type { PageImageGroup } from "./page";

export function PageImagesForm({
  groups,
  initialData,
  saveAction,
}: {
  groups: PageImageGroup[];
  initialData: Record<string, Record<string, { key: string; url: string }>>;
  saveAction: (formData: FormData) => Promise<void>;
}) {
  const [openPages, setOpenPages] = useState<Record<string, boolean>>(() => {
    // Open pages that have images or are the first few important ones
    const open: Record<string, boolean> = {};
    for (const g of groups) {
      const hasImages = Object.values(initialData[g.page] || {}).some((v) => v.key);
      if (hasImages || g.page === "index" || g.page === "about") {
        open[g.page] = true;
      }
    }
    return open;
  });

  function toggle(page: string) {
    setOpenPages((prev) => ({ ...prev, [page]: !prev[page] }));
  }

  return (
    <form action={saveAction} className="mt-6 space-y-3">
      {groups.map((group) => {
        const isOpen = openPages[group.page] ?? false;
        const slotCount = group.slots.length;
        const filledCount = Object.values(initialData[group.page] || {}).filter(
          (v) => v.key
        ).length;

        return (
          <fieldset
            key={group.page}
            className="rounded-lg border border-[#E5E7EA] bg-white overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(group.page)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-[#F7F7F5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#231F20]">
                  {group.label}
                </span>
                <span className="text-xs text-[#9E9F9C]">
                  {filledCount}/{slotCount}장 등록
                </span>
              </div>
              <svg
                className={`h-4 w-4 text-[#9E9F9C] transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="border-t border-[#E5E7EA] px-5 py-4 space-y-5">
                {group.slots.map((slot) => {
                  const fieldName = `${group.page}__${slot.key}`;
                  const current = initialData[group.page]?.[slot.key];
                  return (
                    <div key={fieldName}>
                      <ImageUploadField
                        name={fieldName}
                        label={slot.label}
                        initialKey={current?.key || ""}
                        initialUrl={current?.url || ""}
                        maxWidth={1920}
                        aspect={slot.aspect}
                        allowFreeRatio={!slot.aspect}
                        hintText={slot.guide}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      })}

      <div className="flex justify-end pt-2">
        <button type="submit" className={s.btnPrimary}>
          전체 저장
        </button>
      </div>
    </form>
  );
}
