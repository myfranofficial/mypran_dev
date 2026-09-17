"use client";

import { useEffect } from "react";
import { clearFormDraft } from "./form-draft";

export function FormDraftCleanup({ storageKey }: { storageKey: string }) {
  useEffect(() => {
    clearFormDraft(storageKey);
  }, [storageKey]);
  return null;
}
