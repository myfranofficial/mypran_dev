// 마이프랜 어드민 공용 Tailwind 클래스 상수.
// 팔레트:
//   잉크(본문)    #231F20   보조텍스트 #585958   뮤트 #9E9F9C
//   페이지 배경   #ECECE8   표면 #FFFFFF   표면2 #F7F7F5
//   보더          #E5E7EA   입력보더 #DCDCD7   옅은 구분선 #EEF0F2
//   레드 액센트   #EF4023   레드 호버 #D63418   레드 틴트 #FCE4DF
export const input =
  "min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]";
export const select = `${input} bg-white`;
export const textarea =
  "w-full rounded border border-[#DCDCD7] bg-white px-3 py-2 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]";
export const label = "block text-sm font-medium text-[#585958]";
export const hint = "text-xs text-[#9E9F9C]";
export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-[#EF4023] px-4 font-bold text-white transition-colors hover:bg-[#D63418] disabled:opacity-60";
export const btnGhost =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#DCDCD7] bg-white px-4 font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023]";
export const btnCreate =
  "inline-flex min-h-11 items-center gap-1.5 rounded-md bg-[#EF4023] px-4 text-sm font-bold text-white transition-colors hover:bg-[#D63418]";
export const rowBtn =
  "inline-flex h-10 items-center justify-center rounded border border-[#DCDCD7] bg-white px-3 text-sm font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023] disabled:opacity-30";
export const rowBtnDanger =
  "inline-flex h-10 items-center justify-center rounded border border-[#F3C6BD] bg-white px-3 text-sm font-medium text-[#E03A1E] transition-colors hover:bg-[#FCE4DF]";
export const card = "rounded-lg border border-[#E5E7EA] bg-white p-4";
export const cardTitle = "mb-4 text-sm font-bold text-[#231F20]";
export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#DCDCD7] bg-white px-4 font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023]";
export const errBox = "rounded bg-[#FCE4DF] px-3 py-2 text-sm text-[#E03A1E]";
export const errorBox = "rounded bg-[#FCE4DF] px-3 py-2 text-sm text-[#E03A1E]";
export const okBox = "rounded bg-[#E4F4EB] px-3 py-2 text-sm text-[#2E9E5B]";
export const badgeGreen = "text-xs font-medium text-[#2E9E5B]";
export const badgeGray = "text-xs text-[#9E9F9C]";
export const badgeAmber = "text-xs font-medium text-[#B07A0E]";
export const badgeRed = "text-xs font-medium text-[#E03A1E]";

export const tableWrap =
  "overflow-hidden rounded border border-[#E5E7EA] bg-white";
export const table = "w-full border-collapse text-sm";
export const thead =
  "border-b border-[#E5E7EA] bg-[#F7F7F5] text-left text-[13px] font-bold text-[#585958]";
export const th =
  "border-r border-[#EEF0F2] px-3 py-2.5 whitespace-nowrap font-bold last:border-r-0";
export const td =
  "border-b border-r border-[#EEF0F2] px-3 py-2.5 align-middle text-[#231F20] last:border-r-0";
export const tdMuted =
  "border-b border-r border-[#EEF0F2] px-3 py-2.5 align-middle text-[#9E9F9C] last:border-r-0";
export const emptyBox =
  "mt-5 rounded border border-dashed border-[#DCDCD7] bg-white p-10 text-center text-sm text-[#9E9F9C]";

export const kebabBtn =
  "inline-flex h-9 w-9 items-center justify-center rounded text-[#9E9F9C] transition-colors hover:bg-[#F1F1EF]";
export const menuItem =
  "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#585958] transition-colors hover:bg-[#F7F7F5] disabled:opacity-40";
export const menuItemDanger =
  "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#E03A1E] transition-colors hover:bg-[#FCE4DF]";

export const pageBtn =
  "inline-flex h-9 min-w-9 items-center justify-center rounded px-2.5 text-sm text-[#585958] transition-colors hover:bg-[#F1F1EF]";
export const pageBtnActive =
  "inline-flex h-9 min-w-9 items-center justify-center rounded bg-[#EF4023] px-2.5 text-sm font-bold text-white";
export const pageNav =
  "inline-flex h-9 w-9 items-center justify-center rounded text-[#9E9F9C] transition-colors hover:bg-[#F1F1EF] disabled:opacity-30";

export const cellBtn =
  "inline-flex h-9 items-center justify-center rounded border border-[#DCDCD7] bg-white px-2.5 text-xs font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023] disabled:opacity-30";
export const cellBtnDanger =
  "inline-flex h-9 items-center justify-center rounded border border-[#F3C6BD] bg-white px-2.5 text-xs font-medium text-[#E03A1E] transition-colors hover:bg-[#FCE4DF]";
