import CoolsmsMessageService from "coolsms-node-sdk";

const apiKey = process.env.COOLSMS_API_KEY ?? "";
const apiSecret = process.env.COOLSMS_API_SECRET ?? "";
const senderPhone = process.env.COOLSMS_SENDER ?? "";
const adminPhone = process.env.SMS_ADMIN_PHONE ?? "";

/**
 * 관리자에게 새 상담 알림 SMS 발송 (fire-and-forget)
 * 환경변수 미설정 시 조용히 무시
 */
export async function notifyNewConsultation(data: {
  name: string | null;
  phone: string | null;
  location: string | null;
}) {
  if (!apiKey || !apiSecret || !senderPhone || !adminPhone) {
    console.log("[SMS] CoolSMS 환경변수 미설정 — 알림 건너뜀");
    return;
  }

  const nameStr = data.name || "미입력";
  const phoneStr = data.phone || "미입력";
  const locationStr = data.location || "미입력";

  const text = [
    "[하이큐빌리어드] 새 상담 접수",
    `이름: ${nameStr}`,
    `연락처: ${phoneStr}`,
    `지역: ${locationStr}`,
    "관리자 페이지에서 확인하세요.",
  ].join("\n");

  try {
    const messageService = new CoolsmsMessageService(apiKey, apiSecret);
    await messageService.sendOne({
      to: adminPhone.replace(/-/g, ""),
      from: senderPhone.replace(/-/g, ""),
      text,
      autoTypeDetect: true,
    } as any);
    console.log("[SMS] 상담 알림 발송 성공");
  } catch (err) {
    console.error("[SMS] 발송 실패:", err);
  }
}
