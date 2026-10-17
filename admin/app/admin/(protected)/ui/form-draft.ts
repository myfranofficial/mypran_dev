"use client";

import { useEffect, useRef, useState } from "react";

export const DRAFT_KEYS = {
  banner: "hiq:banner-draft:v1",
  notice: "hiq:notice-draft:v1",
  gallery: "hiq:gallery-draft:v1",
  video: "hiq:video-draft:v1",
  store: "hiq:store-draft:v1",
  event: "hiq:event-draft:v1",
  faq: "hiq:faq-draft:v1",
  download: "hiq:download-draft:v1",
} as const;

export type Draft = Record<string, string[]>;

export function serializeForm(form: HTMLFormElement): Draft {
  const o: Draft = {};
  for (const [k, v] of new FormData(form).entries()) {
    if (typeof v === "string") (o[k] ??= []).push(v);
  }
  return o;
}

export function loadDraft(key: string): Draft | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const d = JSON.parse(raw);
    return d && typeof d === "object" && !Array.isArray(d) ? (d as Draft) : null;
  } catch {
    return null;
  }
}

export function clearFormDraft(key: string): void {
  try { localStorage.removeItem(key); } catch { /* noop */ }
}

export function one(d: Draft | null, k: string): string | undefined {
  return d?.[k]?.[0];
}

export function many(d: Draft | null, k: string): string[] {
  return d?.[k] ?? [];
}

export function keyToUrl(key: string): string {
  return /^https?:\/\//.test(key) ? key : `/uploads/${key.replace(/^\/+/, "")}`;
}

export interface UseFormDraft {
  formRef: React.RefObject<HTMLFormElement | null>;
  draft: Draft | null;
  mounted: boolean;
  restored: boolean;
  dv: (k: string, fb: string) => string;
  reset: () => void;
}

export function useFormDraft(opts: {
  storageKey: string;
  enabled: boolean;
  error?: unknown;
  onRestore?: (d: Draft) => void;
}): UseFormDraft {
  const { storageKey, enabled } = opts;
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const formRef = useRef<HTMLFormElement | null>(null);
  const draftRef = useRef<Draft | null>(null);
  const [mounted, setMounted] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (enabled) {
      const d = loadDraft(storageKey);
      if (d) {
        draftRef.current = d;
        setRestored(true);
        optsRef.current.onRestore?.(d);
      }
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, storageKey]);

  useEffect(() => {
    if (!enabled || !mounted) return;
    let last = "";
    const snap = () => {
      const f = formRef.current;
      if (!f) return;
      try {
        const json = JSON.stringify(serializeForm(f));
        if (json !== last) { last = json; localStorage.setItem(storageKey, json); }
      } catch { /* noop */ }
    };
    const iv = window.setInterval(snap, 1500);
    window.addEventListener("pagehide", snap);
    return () => { window.clearInterval(iv); window.removeEventListener("pagehide", snap); };
  }, [enabled, mounted, storageKey]);

  useEffect(() => {
    if (!enabled || !opts.error || !formRef.current) return;
    try { localStorage.setItem(storageKey, JSON.stringify(serializeForm(formRef.current))); } catch { /* noop */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.error]);

  const d = draftRef.current;
  return {
    formRef,
    draft: d,
    mounted,
    restored,
    dv: (k, fb) => one(d, k) ?? fb,
    reset: () => { clearFormDraft(storageKey); window.location.reload(); },
  };
}
