"use client";

import { useState } from "react";
import { label as labelCls, hint, btnGhost } from "./styles";
import { ImageCropper } from "./image-cropper";

const fileInputCls =
  "block w-full text-sm text-[#585958] file:mr-3 file:min-h-11 file:rounded-md file:border-0 file:bg-[#EF4023] file:px-4 file:font-medium file:text-white hover:file:bg-[#D63418]";

export function ImageUploadField({
  name,
  label,
  initialKey = "",
  initialUrl = "",
  maxWidth,
  required = false,
  hintText,
  aspect,
  allowFreeRatio = false,
  onUrlChange,
}: {
  name: string;
  label: string;
  initialKey?: string;
  initialUrl?: string;
  maxWidth?: number;
  required?: boolean;
  hintText?: string;
  aspect?: number;
  allowFreeRatio?: boolean;
  onUrlChange?: (url: string) => void;
}) {
  const [key, setKey] = useState(initialKey);
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [editSrc, setEditSrc] = useState<string | null>(null);

  async function uploadBlob(blob: Blob, filename: string) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", blob, filename);
      if (maxWidth) fd.append("maxWidth", String(maxWidth));
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "업로드 실패");
      setKey(data.key);
      setUrl(data.url);
      onUrlChange?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
    }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (aspect) {
      setEditSrc(URL.createObjectURL(file));
    } else {
      void uploadBlob(file, file.name);
    }
  }

  return (
    <div className="space-y-1.5">
      <label className={labelCls}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {hintText && <p className={hint}>{hintText}</p>}
      <input type="hidden" name={name} value={key} />

      {url && (
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="미리보기" className="h-32 w-auto rounded border border-[#E5E7EA] object-contain" />
          <button type="button" onClick={() => { setKey(""); setUrl(""); onUrlChange?.(""); }} className={btnGhost}>
            제거
          </button>
        </div>
      )}

      <input type="file" accept="image/*" onChange={onFile} disabled={uploading} className={fileInputCls} />
      {uploading && <p className={hint}>업로드 중…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {editSrc && aspect && (
        <ImageCropper
          imageSrc={editSrc}
          aspect={aspect}
          allowFreeRatio={allowFreeRatio}
          onCancel={() => { URL.revokeObjectURL(editSrc); setEditSrc(null); }}
          onDone={(blob) => { URL.revokeObjectURL(editSrc); setEditSrc(null); void uploadBlob(blob, "crop.jpg"); }}
        />
      )}
    </div>
  );
}
