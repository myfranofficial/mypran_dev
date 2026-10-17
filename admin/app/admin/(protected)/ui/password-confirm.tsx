"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function PasswordConfirm({
  action,
  fields,
  label,
  title = "관리자 확인",
  message,
  confirmLabel = "확인",
  variant = "default",
  className,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields?: Record<string, string | number | undefined | null>;
  label: ReactNode;
  title?: string;
  message?: string;
  confirmLabel?: string;
  variant?: "default" | "danger";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>{label}</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
          <form action={action} className="relative w-full max-w-sm space-y-4 rounded border border-[#E5E7EA] bg-white p-5 shadow-xl">
            {fields && Object.entries(fields).map(([k, v]) => v == null ? null : <input key={k} type="hidden" name={k} value={String(v)} />)}
            <div>
              <h2 className="text-base font-bold text-[#231F20]">{title}</h2>
              {message && <p className="mt-1 text-sm text-[#585958]">{message}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="pc-password" className="block text-sm font-medium text-[#585958]">관리자 비밀번호</label>
              <input ref={inputRef} id="pc-password" name="password" type="password" autoComplete="current-password" required className="min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]" />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="submit" className={`min-h-11 flex-1 rounded-md px-4 text-sm font-medium text-white transition-colors ${variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-[#EF4023] hover:bg-[#D63418]"}`}>{confirmLabel}</button>
              <button type="button" onClick={() => setOpen(false)} className="min-h-11 rounded border border-[#DCDCD7] px-4 text-sm font-medium text-[#585958] hover:bg-[#F7F7F5]">취소</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
