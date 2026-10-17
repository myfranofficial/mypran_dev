import Link from "next/link";
import { getDb } from "@/lib/db";
import { countUnread } from "@/lib/db/consultations";
import * as s from "./ui/styles";

const MODULE_MAP: {
  label: string;
  table: string;
  href: string;
}[] = [
  { label: "브랜드", table: "brands", href: "/admin/brands" },
  { label: "업종 카테고리", table: "brand_categories", href: "/admin/brands/categories" },
  { label: "배너", table: "banners", href: "/admin/banners" },
  { label: "공지사항", table: "notices", href: "/admin/notices" },
  { label: "FAQ", table: "faq_items", href: "/admin/faq" },
  { label: "자료실", table: "downloads", href: "/admin/downloads" },
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
          <p className="mt-1 text-sm text-[#9E9F9C]">마이프랜 온라인창업박람회 관리 현황</p>
        </div>
      </div>

      {/* 관리 모듈 카드 */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {MODULE_MAP.map((m) => (
          <Link key={m.label} href={m.href} className={`${s.card} block`}>
            <p className="text-xs text-[#9E9F9C]">{m.label}</p>
            <p className="mt-1 text-2xl font-bold text-[#231F20]">{count(m.table)}</p>
          </Link>
        ))}
      </div>

      {/* 운영 가이드 */}
      <div className="mt-6 rounded-lg border border-red-100 bg-red-50 p-4">
        <h3 className="text-sm font-bold text-red-800">운영 가이드</h3>
        <ul className="mt-2 space-y-1 text-sm text-red-700">
          <li>• 브랜드 저장 시 <strong>브랜드 목록 페이지에 즉시 반영</strong>됩니다</li>
          <li>• 업종 카테고리를 먼저 등록한 뒤 브랜드를 추가하세요</li>
          <li>• 상담 신청 시 등록된 이메일/SMS로 알림이 발송됩니다</li>
        </ul>
      </div>

      {/* 상담 문의 */}
      <div className="mt-8">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-[#231F20]">최근 상담 문의</h2>
          {unread > 0 && (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#CC0000] px-2 text-xs font-bold text-white">
              {unread}건 미읽음
            </span>
          )}
          <Link href="/admin/consultations" className="ml-auto text-xs text-[#CC0000] hover:underline">
            전체 보기 →
          </Link>
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
                  c.is_read ? "border-[#E5E7EA] bg-white" : "border-[#CC0000] bg-red-50"
                } hover:border-[#CC0000]`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#231F20]">
                    {c.name || "익명"} {c.phone && `(${c.phone})`}
                    {c.brand_name && (
                      <span className="ml-2 rounded bg-[#CC0000] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {c.brand_name}
                      </span>
                    )}
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
