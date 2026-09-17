import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { getSettings, setSettings } from "@/lib/db/settings";
import { exportAll } from "@/lib/db/json-export";
import * as s from "../ui/styles";

const SETTINGS_KEYS = [
  "phone",
  "kakao_id",
  "sms_number",
  "address",
  "business_hours",
  "terms",
  "privacy_policy",
];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string; error?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const settings = getSettings(SETTINGS_KEYS);

  async function saveAction(formData: FormData) {
    "use server";
    await requireWrite();
    const entries: Record<string, string> = {};
    for (const key of SETTINGS_KEYS) {
      entries[key] = String(formData.get(key) ?? "").trim();
    }
    setSettings(entries);

    // 설정 변경 시 모든 JSON에 contact 정보가 반영되므로 전체 재생성
    try { exportAll(); } catch (e) { console.error("[settings] exportAll:", e); }

    revalidatePath("/admin/settings");
    redirect("/admin/settings?msg=saved");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">설정</h1>
      <p className="mt-1 text-sm text-[#9E9F9C]">사이트 기본 정보 관리. 저장 시 프론트엔드 JSON이 자동 갱신됩니다.</p>

      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}
      {sp.error && <div className={`mt-4 ${s.errorBox}`}>{sp.error}</div>}

      <form action={saveAction} className="mt-6 space-y-6">
        {/* 연락처 */}
        <fieldset className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
          <legend className="text-sm font-bold text-[#231F20]">연락처</legend>

          <div className="space-y-1.5">
            <label htmlFor="phone" className={s.label}>대표 전화번호</label>
            <input id="phone" name="phone" defaultValue={settings.phone ?? "010-4708-6091"} className={s.input} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="kakao_id" className={s.label}>카카오톡 ID</label>
            <input id="kakao_id" name="kakao_id" defaultValue={settings.kakao_id ?? ""} className={s.input} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="sms_number" className={s.label}>SMS 수신 번호</label>
            <input id="sms_number" name="sms_number" defaultValue={settings.sms_number ?? ""} className={s.input} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="address" className={s.label}>주소</label>
            <input id="address" name="address" defaultValue={settings.address ?? ""} className={s.input} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="business_hours" className={s.label}>영업시간</label>
            <input id="business_hours" name="business_hours" defaultValue={settings.business_hours ?? "평일 09:00 ~ 18:00"} className={s.input} />
          </div>
        </fieldset>

        {/* 약관 */}
        <fieldset className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
          <legend className="text-sm font-bold text-[#231F20]">약관</legend>

          <div className="space-y-1.5">
            <label htmlFor="terms" className={s.label}>이용약관</label>
            <textarea id="terms" name="terms" rows={8} defaultValue={settings.terms ?? ""} className={s.textarea} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="privacy_policy" className={s.label}>개인정보처리방침</label>
            <textarea id="privacy_policy" name="privacy_policy" rows={8} defaultValue={settings.privacy_policy ?? ""} className={s.textarea} />
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button type="submit" className={s.btnPrimary}>저장</button>
        </div>
      </form>
    </div>
  );
}
