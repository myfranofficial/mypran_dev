"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (e) => reject(e));
    img.src = url;
  });
}

const rad = (deg: number) => (deg * Math.PI) / 180;

function rotateSize(w: number, h: number, rotation: number) {
  const r = rad(rotation);
  return {
    width: Math.abs(Math.cos(r) * w) + Math.abs(Math.sin(r) * h),
    height: Math.abs(Math.sin(r) * w) + Math.abs(Math.cos(r) * h),
  };
}

async function makeFlippedSrc(src: string): Promise<string> {
  const image = await createImage(src);
  const c = document.createElement("canvas");
  c.width = image.width;
  c.height = image.height;
  const ctx = c.getContext("2d")!;
  ctx.translate(image.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(image, 0, 0);
  return c.toDataURL("image/png");
}

async function getCroppedBlob(imageSrc: string, crop: Area, rotation: number): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const { width: bw, height: bh } = rotateSize(image.width, image.height, rotation);
  canvas.width = bw;
  canvas.height = bh;
  ctx.translate(bw / 2, bh / 2);
  ctx.rotate(rad(rotation));
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const out = document.createElement("canvas");
  out.width = Math.max(1, Math.round(crop.width));
  out.height = Math.max(1, Math.round(crop.height));
  const octx = out.getContext("2d")!;
  octx.drawImage(canvas, Math.round(crop.x), Math.round(crop.y), Math.round(crop.width), Math.round(crop.height), 0, 0, Math.round(crop.width), Math.round(crop.height));
  return new Promise((resolve, reject) => {
    out.toBlob((b) => (b ? resolve(b) : reject(new Error("이미지 처리 실패"))), "image/jpeg", 0.92);
  });
}

const ctrlBtn = "min-h-9 rounded border border-[rgba(255,255,255,0.3)] px-3 text-xs font-medium text-[#E7E5E2] transition-colors hover:bg-[rgba(255,255,255,0.1)]";

function ratioLabel(a: number): string {
  if (Math.abs(a - 4 / 5) < 0.01) return "4:5";
  if (Math.abs(a - 1) < 0.01) return "1:1";
  if (Math.abs(a - 3) < 0.01) return "3:1";
  if (Math.abs(a - 16 / 9) < 0.01) return "16:9";
  if (Math.abs(a - 9 / 16) < 0.01) return "9:16";
  if (Math.abs(a - 4 / 3) < 0.01) return "4:3";
  return a.toFixed(2);
}

export function ImageCropper({
  imageSrc,
  aspect,
  title = "사진 편집",
  allowFreeRatio = false,
  onCancel,
  onDone,
}: {
  imageSrc: string;
  aspect: number;
  title?: string;
  allowFreeRatio?: boolean;
  onCancel: () => void;
  onDone: (blob: Blob) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(imageSrc);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [free, setFree] = useState(false);
  const [naturalAspect, setNaturalAspect] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    createImage(imageSrc).then((img) => {
      if (alive && img.naturalHeight > 0) setNaturalAspect(img.naturalWidth / img.naturalHeight);
    });
    return () => { alive = false; };
  }, [imageSrc]);

  const effectiveAspect = free ? naturalAspect ?? aspect : aspect;

  useEffect(() => {
    let alive = true;
    if (!flipH) { setDisplaySrc(imageSrc); return; }
    makeFlippedSrc(imageSrc).then((s) => { if (alive) setDisplaySrc(s); });
    return () => { alive = false; };
  }, [flipH, imageSrc]);

  const onCropComplete = useCallback((_: Area, pixels: Area) => setArea(pixels), []);

  const reset = () => { setCrop({ x: 0, y: 0 }); setZoom(1); setRotation(0); setFlipH(false); };

  const apply = async () => {
    if (!area) return;
    setBusy(true);
    try { onDone(await getCroppedBlob(displaySrc, area, rotation)); } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#231F20]/95">
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-[#E7E5E2]">
        <span className="text-sm font-bold">{title}</span>
        {allowFreeRatio ? (
          <div className="flex overflow-hidden rounded border border-[rgba(255,255,255,0.3)] text-[11px]">
            <button type="button" onClick={() => setFree(false)} className={`px-2.5 py-1 ${!free ? "bg-[#EF4023] text-white font-bold" : "text-[#E7E5E2]"}`}>{ratioLabel(aspect)} 규격</button>
            <button type="button" onClick={() => setFree(true)} className={`px-2.5 py-1 ${free ? "bg-[#EF4023] text-white font-bold" : "text-[#E7E5E2]"}`}>원본 비율</button>
          </div>
        ) : (
          <span className="text-[11px] text-[#9E9F9C]">비율 {ratioLabel(aspect)} 고정</span>
        )}
      </div>

      <div className="relative flex-1">
        <Cropper image={displaySrc} crop={crop} zoom={zoom} rotation={rotation} aspect={effectiveAspect} restrictPosition={false} showGrid onCropChange={setCrop} onZoomChange={setZoom} onRotationChange={setRotation} onCropComplete={onCropComplete} />
      </div>

      <div className="space-y-3 border-t border-[rgba(255,255,255,0.15)] bg-[#231F20] px-4 py-4">
        <label className="flex items-center gap-3 text-[11px] text-[#E7E5E2]">
          <span className="w-10 shrink-0">확대</span>
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="flex-1 accent-[#EF4023]" />
        </label>
        <label className="flex items-center gap-3 text-[11px] text-[#E7E5E2]">
          <span className="w-10 shrink-0">회전</span>
          <input type="range" min={-180} max={180} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="flex-1 accent-[#EF4023]" />
          <span className="w-9 shrink-0 text-right tabular-nums">{rotation}°</span>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={ctrlBtn} onClick={() => setRotation((r) => r - 90)}>↺ 90°</button>
          <button type="button" className={ctrlBtn} onClick={() => setRotation((r) => r + 90)}>90° ↻</button>
          <button type="button" className={ctrlBtn} onClick={() => setFlipH((f) => !f)}>좌우 반전{flipH ? " ✓" : ""}</button>
          <button type="button" className={ctrlBtn} onClick={reset}>초기화</button>

          <div className="ml-auto flex gap-2">
            <button type="button" onClick={onCancel} className={ctrlBtn}>취소</button>
            <button type="button" onClick={apply} disabled={busy || !area} className="min-h-9 rounded-md border border-[#EF4023] bg-[#EF4023] px-4 text-xs font-bold text-white transition-colors hover:bg-[#D63418] disabled:opacity-50">
              {busy ? "적용 중…" : "적용"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
