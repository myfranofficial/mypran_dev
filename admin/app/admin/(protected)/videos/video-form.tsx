"use client";

import { useActionState, useState, useCallback } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { ImageSpecGuide } from "../ui/image-spec-guide";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../ui/styles";

const CATEGORIES = ["매장소개", "이벤트", "교육", "기타"];

const DEFAULT_THUMBNAILS = [
  "/static/images/vid-1.jpg",
  "/static/images/vid-2.jpg",
  "/static/images/vid-3.jpg",
  "/static/images/vid-4.jpg",
  "/static/images/vid-5.jpg",
  "/static/images/vid-6.jpg",
  "/static/images/vid-7.jpg",
  "/static/images/vid-8.jpg",
];

type ThumbMode = "auto" | "default" | "upload";

function detectInitialMode(thumbnailUrl: string | null | undefined): ThumbMode {
  if (!thumbnailUrl) return "auto";
  if (DEFAULT_THUMBNAILS.includes(thumbnailUrl)) return "default";
  return "upload";
}

interface VideoFormProps {
  action: (prev: any, formData: FormData) => Promise<any>;
  video?: {
    title: string;
    description: string | null;
    category: string | null;
    thumbnail_url: string | null;
    youtube_id: string | null;
    date: string | null;
  };
}

function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  if (/^[\w-]{11}$/.test(url)) return url;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^&?#]+)/);
  return m?.[1] || null;
}

export function VideoForm({ action, video }: VideoFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [youtubeId, setYoutubeId] = useState(video?.youtube_id ?? "");
  const initMode = detectInitialMode(video?.thumbnail_url);
  const [thumbMode, setThumbMode] = useState<ThumbMode>(initMode);
  const [selectedDefault, setSelectedDefault] = useState<string>(
    initMode === "default" ? video!.thumbnail_url! : ""
  );

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = extractYoutubeId(e.target.value);
    setYoutubeId(id ?? "");
  }, []);

  // thumbnail_url 값: auto→빈값, default→선택경로, upload→ImageUploadField가 처리
  const thumbHiddenValue = thumbMode === "auto" ? "" : thumbMode === "default" ? selectedDefault : undefined;

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className={s.errorBox}>{state.error}</div>}

      <ImageSpecGuide specs={[{ label: "영상 썸네일", size: "1280 x 720px", ratio: "16:9", note: "미등록 시 YouTube 자동 썸네일 사용" }]} />

      <div className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
        <div className="space-y-1.5">
          <label htmlFor="title" className={s.label}>제목 *</label>
          <input id="title" name="title" required defaultValue={video?.title ?? ""} className={s.input} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="youtube_url" className={s.label}>YouTube URL 또는 ID *</label>
          <input
            id="youtube_url"
            name="youtube_url"
            defaultValue={video?.youtube_id ? `https://youtu.be/${video.youtube_id}` : ""}
            onChange={handleUrlChange}
            className={s.input}
            placeholder="https://youtu.be/... 또는 영상 ID"
          />
          <input type="hidden" name="youtube_id" value={youtubeId} />
          {youtubeId && (
            <div className="mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                alt="미리보기"
                className="h-24 rounded border object-cover"
              />
              <p className="mt-1 text-xs text-[#9E9F9C]">YouTube ID: {youtubeId}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="category" className={s.label}>카테고리</label>
            <select id="category" name="category" defaultValue={video?.category ?? ""} className={s.input}>
              <option value="">선택 안 함</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="date" className={s.label}>날짜</label>
            <input id="date" name="date" type="date" defaultValue={video?.date ?? ""} className={s.input} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className={s.label}>설명</label>
          <textarea id="description" name="description" rows={3} defaultValue={video?.description ?? ""} className={s.textarea} />
        </div>

        {/* 썸네일 선택 */}
        <div className="space-y-3">
          <p className={s.label}>썸네일 이미지</p>
          <div className="flex flex-wrap gap-2">
            {(["auto", "default", "upload"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => { setThumbMode(mode); if (mode !== "default") setSelectedDefault(""); }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  thumbMode === mode
                    ? "bg-[#2A2520] text-white"
                    : "bg-white border border-[#E5E7EA] text-[#6B7280] hover:bg-[#F9FAFB]"
                }`}
              >
                {mode === "auto" && "YouTube 자동"}
                {mode === "default" && "기본 이미지 선택"}
                {mode === "upload" && "직접 업로드"}
              </button>
            ))}
          </div>

          {/* auto: hidden input으로 빈 값 전달 */}
          {thumbMode === "auto" && (
            <>
              <input type="hidden" name="thumbnail_url" value="" />
              <p className="text-sm text-[#9E9F9C]">
                YouTube 영상의 기본 썸네일이 자동 적용됩니다.
              </p>
            </>
          )}

          {/* default: 기본 이미지 그리드 */}
          {thumbMode === "default" && (
            <>
              <input type="hidden" name="thumbnail_url" value={selectedDefault} />
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                {DEFAULT_THUMBNAILS.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedDefault(src)}
                    className={`relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                      selectedDefault === src
                        ? "border-[#EF4023] ring-2 ring-[#EF4023]/30"
                        : "border-[#E5E7EA] hover:border-[#9E9F9C]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    {selectedDefault === src && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-lg font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {!selectedDefault && (
                <p className="text-sm text-amber-600">이미지를 선택해주세요.</p>
              )}
            </>
          )}

          {/* upload: 기존 ImageUploadField */}
          {thumbMode === "upload" && (
            <ImageUploadField
              name="thumbnail_url"
              label="커스텀 썸네일"
              aspect={16 / 9}
              maxWidth={1280}
              hintText="권장 1280x720px (16:9)"
              initialKey={initMode === "upload" ? (video?.thumbnail_url ?? "") : ""}
              initialUrl={initMode === "upload" && video?.thumbnail_url ? imageUrl(video.thumbnail_url) : ""}
            />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a href="/admin/videos" className={s.btnGhost}>취소</a>
        <button type="submit" disabled={pending} className={s.btnPrimary}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
