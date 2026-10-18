import { NextResponse } from "next/server";
import { incrementViewCount } from "@/lib/db/notices";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
  }

  incrementViewCount(id);
  return NextResponse.json({ ok: true });
}
