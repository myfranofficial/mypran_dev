import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser, canWrite } from "@/lib/auth/user";
import { listConsultations } from "@/lib/db/consultations";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !canWrite(user)) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const status = req.nextUrl.searchParams.get("status") || undefined;
  const items = listConsultations({ status });

  const BOM = "\uFEFF";
  const header = "ID,이름,연락처,이메일,희망지역,메시지,상태,접수일";

  function escapeCSV(val: string | null | undefined): string {
    if (!val) return "";
    const s = val.replace(/"/g, '""');
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s}"`
      : s;
  }

  function getStatus(c: { is_handled: number; is_read: number }): string {
    if (c.is_handled) return "처리완료";
    if (c.is_read) return "읽음";
    return "미읽음";
  }

  const rows = items.map((c) =>
    [
      c.id,
      escapeCSV(c.name),
      escapeCSV(c.phone),
      escapeCSV(c.email),
      escapeCSV(c.location),
      escapeCSV(c.message),
      getStatus(c),
      c.created_at?.split(" ")[0] || "",
    ].join(",")
  );

  const csv = BOM + header + "\n" + rows.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="consultations_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
