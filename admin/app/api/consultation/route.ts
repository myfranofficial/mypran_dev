import { NextResponse, type NextRequest } from "next/server";
import { createConsultation } from "@/lib/db/consultations";
import { checkRateLimit } from "@/lib/rate-limit";
import { notifyNewConsultation } from "@/lib/sms";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 레이트리밋 (IP당 10분에 3회)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip")?.trim() || "unknown";
  const rl = checkRateLimit(`consultation:${ip}`, 3, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `요청이 많습니다. ${rl.retryAfter}초 후 다시 시도해 주세요.` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const location = String(body.location ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name && !phone && !message) {
      return NextResponse.json({ error: "내용을 입력해 주세요." }, { status: 400 });
    }

    const id = createConsultation({
      name: name || null,
      phone: phone || null,
      email: email || null,
      location: location || null,
      message: message || null,
    });

    // 관리자 SMS 알림 (실패해도 상담 등록은 유지)
    notifyNewConsultation({ name: name || null, phone: phone || null, location: location || null })
      .catch(() => {});

    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ error: "처리에 실패했습니다." }, { status: 500 });
  }
}
