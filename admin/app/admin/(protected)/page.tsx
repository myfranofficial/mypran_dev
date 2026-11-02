import Link from "next/link";
import { getDb } from "@/lib/db";
import { countUnread } from "@/lib/db/consultations";
import { PreviewLink } from "./ui/preview-link";
import * as s from "./ui/styles";

const SITE_URL = "https://xn--lj2b54b90v2gn.com";

const MODULE_MAP: {
  label: string;
  table: string;
  href: string;
  frontPath: string;
  frontLabel: string;
}[] = [
  { label: "히어로 배너", table: "banners", href: "/admin/banners", frontPath: "/", frontLabel: "메인 페이지" },
  { label: "공지사항", table: "notices", href: "/admin/notices", frontPath: "/notices", frontLabel: "공지사항" },
  { label: "사진 갤러리", table: "gallery_images", href: "/admin/gallery", frontPath: "/", frontLabel: "갤러리" },
  { label: "영상 갤러리", table: "videos", href: "/admin/videos", frontPath: "/", frontLabel: "영상" },
  { label: "브랜드", table: "brands", href: "/admin/brands", frontPath: "/brands", frontLabel: "브랜드관" },
  { label: "이벤트", table: "events", href: "/admin/events", frontPath: "/", frontLabel: "이벤트" },
  { label: "자주 묻는 질문", table: "faq_items", href: "/admin/faq", frontPath: "/", frontLabel: "FAQ" },
  { label: "자료실", table: "downloads", href: "/admin/downloads", frontPath: "/", frontLabel: "자료실" },
];

export default function DashboardPage() {
  const db = getDb();
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS cnt FROM ${table}`).get() as { cnt: number }).cnt;

  const unread = countUnread();

  const recentConsultations = db
    .prepare("SELECT * FROM consultations ORDER BY created_at DESC LIMIT 5")
    .all() as any[];

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">대시보드</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">마이프랜 사이트 관리 현황</p>
        </div>
        <PreviewLink path="/" label="사이트 보기" />
      </div>

      {/* 관리 모듈 카드 — 각 카드에 프론트 링크 포함 */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MODULE_MAP.map((m) => (
          <div key={m.label} className={`${s.card} group relative`}>
            <Link href={m.href} className="block">
              <p className="text-xs text-[#9E9F9C]">{m.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#231F20]">{count(m.table)}</p>
            </Link>
            <a
              href={`${SITE_URL}${m.frontPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-[#B0B0B0] transition hover:text-[#EF4023]"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {m.frontLabel} 보기
            </a>
          </div>
        ))}
      </div>

      {/* 바로가기 */}
      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <h3 className="text-sm font-bold text-blue-800">운영 가이드</h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-700">
          <li>• 각 관리 페이지에서 내용을 수정하면 <strong>실제 사이트에 즉시 반영</strong>됩니다</li>
          <li>• 수정 후 <strong>"실제 페이지 보기"</strong> 버튼으로 결과를 확인하세요</li>
          <li>• 설정 페이지에서 전화번호, 주소, 약관 등을 변경하면 <strong>모든 페이지 하단</strong>에 반영됩니다</li>
        </ul>
      </div>

      {/* 상담 문의 */}
      <div className="mt-8">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-[#231F20]">최근 상담 문의</h2>
          {unread > 0 && (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#EF4023] px-2 text-xs font-bold text-white">
              {unread}건 미읽음
            </span>
          )}
        </div>

        {recentConsultations.length === 0 ? (
          <div className={s.emptyBox}>아직 상담 문의가 없습니다.</div>
        ) : (
          <div className="mt-3 space-y-2">
            {recentConsultations.map((c: any) => (
              <Link
                key={c.id}
                href={`/admin/consultations/${c.id}`}
                className={`block rounded border p-3 transition-colors ${
                  c.is_read ? "border-[#E5E7EA] bg-white" : "border-[#EF4023] bg-[#FCE4DF]"
                } hover:border-[#EF4023]`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#231F20]">
                    {c.name || "익명"} {c.phone && `(${c.phone})`}
                  </span>
                  <span className="text-xs text-[#9E9F9C]">{c.created_at}</span>
                </div>
                {c.message && (
                  <p className="mt-1 truncate text-sm text-[#585958]">{c.message}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
