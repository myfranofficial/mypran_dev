"use client";

import { useActionState, useState, useCallback } from "react";
import { ImageUploadField } from "../ui/image-upload-field";
import { ImageSpecGuide } from "../ui/image-spec-guide";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../ui/styles";

const CATEGORIES = ["매장소개", "이벤트", "교육", "기타"];

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
  // Already an ID (11 chars, no slashes)
  if (/^[\w-]{11}$/.test(url)) return url;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^&?#]+)/);
  return m?.[1] || null;
}

export function VideoForm({ action, video }: VideoFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [youtubeId, setYoutubeId] = useState(video?.youtube_id ?? "");

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = extractYoutubeId(e.target.value);
    setYoutubeId(id ?? "");
  }, []);

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

        <ImageUploadField
          name="thumbnail_url"
          label="커스텀 썸네일 (선택)"
          aspect={16 / 9}
          maxWidth={640}
          hintText="미등록 시 YouTube 기본 썸네일 사용"
          initialKey={video?.thumbnail_url ?? ""}
          initialUrl={video?.thumbnail_url ? imageUrl(video.thumbnail_url) : ""}
        />
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
