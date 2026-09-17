import Link from "next/link";
import { getDb } from "@/lib/db";
import { countUnread } from "@/lib/db/consultations";
import * as s from "./ui/styles";

export default function DashboardPage() {
  const db = getDb();
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS cnt FROM ${table}`).get() as { cnt: number }).cnt;

  const stats = [
    { label: "배너", value: count("banners"), href: "/admin/banners" },
    { label: "공지사항", value: count("notices"), href: "/admin/notices" },
    { label: "사진 갤러리", value: count("gallery_images"), href: "/admin/gallery" },
    { label: "영상", value: count("videos"), href: "/admin/videos" },
    { label: "매장", value: count("stores"), href: "/admin/stores" },
    { label: "이벤트", value: count("events"), href: "/admin/events" },
    { label: "FAQ", value: count("faq_items"), href: "/admin/faq" },
    { label: "자료실", value: count("downloads"), href: "/admin/downloads" },
  ];

  const unread = countUnread();

  const recentConsultations = db
    .prepare("SELECT * FROM consultations ORDER BY created_at DESC LIMIT 5")
    .all() as any[];

  return (
    <div className="mx-auto max-w-[1280px]">
      <h1 className="text-xl font-bold text-[#231F20]">대시보드</h1>
      <p className="mt-1 text-sm text-[#9E9F9C]">HiQ Billiard 사이트 관리 현황</p>

      {/* 통계 카드 */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((st) => (
          <Link
            key={st.label}
            href={st.href}
            className={`${s.card} transition-colors hover:border-[#EF4023]`}
          >
            <p className="text-xs text-[#9E9F9C]">{st.label}</p>
            <p className="mt-1 text-2xl font-bold text-[#231F20]">{st.value}</p>
          </Link>
        ))}
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
                href={`/admin/consultations`}
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
