module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/admin/(protected)/ui/styles.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// HiQ 어드민 공용 Tailwind 클래스 상수.
// 팔레트:
//   잉크(본문)    #231F20   보조텍스트 #585958   뮤트 #9E9F9C
//   페이지 배경   #ECECE8   표면 #FFFFFF   표면2 #F7F7F5
//   보더          #E5E7EA   입력보더 #DCDCD7   옅은 구분선 #EEF0F2
//   레드 액센트   #EF4023   레드 호버 #D63418   레드 틴트 #FCE4DF
__turbopack_context__.s([
    "badgeAmber",
    ()=>badgeAmber,
    "badgeGray",
    ()=>badgeGray,
    "badgeGreen",
    ()=>badgeGreen,
    "badgeRed",
    ()=>badgeRed,
    "btnCreate",
    ()=>btnCreate,
    "btnGhost",
    ()=>btnGhost,
    "btnPrimary",
    ()=>btnPrimary,
    "card",
    ()=>card,
    "cellBtn",
    ()=>cellBtn,
    "cellBtnDanger",
    ()=>cellBtnDanger,
    "emptyBox",
    ()=>emptyBox,
    "errorBox",
    ()=>errorBox,
    "hint",
    ()=>hint,
    "input",
    ()=>input,
    "kebabBtn",
    ()=>kebabBtn,
    "label",
    ()=>label,
    "menuItem",
    ()=>menuItem,
    "menuItemDanger",
    ()=>menuItemDanger,
    "okBox",
    ()=>okBox,
    "pageBtn",
    ()=>pageBtn,
    "pageBtnActive",
    ()=>pageBtnActive,
    "pageNav",
    ()=>pageNav,
    "rowBtn",
    ()=>rowBtn,
    "rowBtnDanger",
    ()=>rowBtnDanger,
    "select",
    ()=>select,
    "table",
    ()=>table,
    "tableWrap",
    ()=>tableWrap,
    "td",
    ()=>td,
    "tdMuted",
    ()=>tdMuted,
    "textarea",
    ()=>textarea,
    "th",
    ()=>th,
    "thead",
    ()=>thead
]);
const input = "min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]";
const select = `${input} bg-white`;
const textarea = "w-full rounded border border-[#DCDCD7] bg-white px-3 py-2 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]";
const label = "block text-sm font-medium text-[#585958]";
const hint = "text-xs text-[#9E9F9C]";
const btnPrimary = "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-[#EF4023] px-4 font-bold text-white transition-colors hover:bg-[#D63418] disabled:opacity-60";
const btnGhost = "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#DCDCD7] bg-white px-4 font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023]";
const btnCreate = "inline-flex min-h-11 items-center gap-1.5 rounded-md bg-[#EF4023] px-4 text-sm font-bold text-white transition-colors hover:bg-[#D63418]";
const rowBtn = "inline-flex h-10 items-center justify-center rounded border border-[#DCDCD7] bg-white px-3 text-sm font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023] disabled:opacity-30";
const rowBtnDanger = "inline-flex h-10 items-center justify-center rounded border border-[#F3C6BD] bg-white px-3 text-sm font-medium text-[#E03A1E] transition-colors hover:bg-[#FCE4DF]";
const card = "rounded-lg border border-[#E5E7EA] bg-white p-4";
const errorBox = "rounded bg-[#FCE4DF] px-3 py-2 text-sm text-[#E03A1E]";
const okBox = "rounded bg-[#E4F4EB] px-3 py-2 text-sm text-[#2E9E5B]";
const badgeGreen = "text-xs font-medium text-[#2E9E5B]";
const badgeGray = "text-xs text-[#9E9F9C]";
const badgeAmber = "text-xs font-medium text-[#B07A0E]";
const badgeRed = "text-xs font-medium text-[#E03A1E]";
const tableWrap = "overflow-hidden rounded border border-[#E5E7EA] bg-white";
const table = "w-full border-collapse text-sm";
const thead = "border-b border-[#E5E7EA] bg-[#F7F7F5] text-left text-[13px] font-bold text-[#585958]";
const th = "border-r border-[#EEF0F2] px-3 py-2.5 whitespace-nowrap font-bold last:border-r-0";
const td = "border-b border-r border-[#EEF0F2] px-3 py-2.5 align-middle text-[#231F20] last:border-r-0";
const tdMuted = "border-b border-r border-[#EEF0F2] px-3 py-2.5 align-middle text-[#9E9F9C] last:border-r-0";
const emptyBox = "mt-5 rounded border border-dashed border-[#DCDCD7] bg-white p-10 text-center text-sm text-[#9E9F9C]";
const kebabBtn = "inline-flex h-9 w-9 items-center justify-center rounded text-[#9E9F9C] transition-colors hover:bg-[#F1F1EF]";
const menuItem = "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#585958] transition-colors hover:bg-[#F7F7F5] disabled:opacity-40";
const menuItemDanger = "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#E03A1E] transition-colors hover:bg-[#FCE4DF]";
const pageBtn = "inline-flex h-9 min-w-9 items-center justify-center rounded px-2.5 text-sm text-[#585958] transition-colors hover:bg-[#F1F1EF]";
const pageBtnActive = "inline-flex h-9 min-w-9 items-center justify-center rounded bg-[#EF4023] px-2.5 text-sm font-bold text-white";
const pageNav = "inline-flex h-9 w-9 items-center justify-center rounded text-[#9E9F9C] transition-colors hover:bg-[#F1F1EF] disabled:opacity-30";
const cellBtn = "inline-flex h-9 items-center justify-center rounded border border-[#DCDCD7] bg-white px-2.5 text-xs font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023] disabled:opacity-30";
const cellBtnDanger = "inline-flex h-9 items-center justify-center rounded border border-[#F3C6BD] bg-white px-2.5 text-xs font-medium text-[#E03A1E] transition-colors hover:bg-[#FCE4DF]";
}),
"[project]/app/admin/(protected)/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$consultations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/consultations.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/styles.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const MODULE_MAP = [
    {
        label: "브랜드",
        table: "brands",
        href: "/admin/brands"
    },
    {
        label: "업종 카테고리",
        table: "brand_categories",
        href: "/admin/brands/categories"
    },
    {
        label: "배너",
        table: "banners",
        href: "/admin/banners"
    },
    {
        label: "공지사항",
        table: "notices",
        href: "/admin/notices"
    },
    {
        label: "FAQ",
        table: "faq_items",
        href: "/admin/faq"
    },
    {
        label: "자료실",
        table: "downloads",
        href: "/admin/downloads"
    }
];
function DashboardPage() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const count = (table)=>db.prepare(`SELECT COUNT(*) AS cnt FROM ${table}`).get().cnt;
    const unread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$consultations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["countUnread"])();
    const recentConsultations = db.prepare("SELECT * FROM consultations ORDER BY created_at DESC LIMIT 5").all();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-[1280px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold text-[#231F20]",
                            children: "대시보드"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/page.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-[#9E9F9C]",
                            children: "마이프랜 온라인창업박람회 관리 현황"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/(protected)/page.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3",
                children: MODULE_MAP.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: m.href,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["card"]} block`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#9E9F9C]",
                                children: m.label
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-bold text-[#231F20]",
                                children: count(m.table)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        ]
                    }, m.label, true, {
                        fileName: "[project]/app/admin/(protected)/page.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-lg border border-red-100 bg-red-50 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-bold text-red-800",
                        children: "운영 가이드"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-2 space-y-1 text-sm text-red-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• 브랜드 저장 시 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "브랜드 목록 페이지에 즉시 반영"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 26
                                    }, this),
                                    "됩니다"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "• 업종 카테고리를 먼저 등록한 뒤 브랜드를 추가하세요"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "• 상담 신청 시 등록된 이메일/SMS로 알림이 발송됩니다"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-[#231F20]",
                                children: "최근 상담 문의"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#CC0000] px-2 text-xs font-bold text-white",
                                children: [
                                    unread,
                                    "건 미읽음"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/consultations",
                                className: "ml-auto text-xs text-[#CC0000] hover:underline",
                                children: "전체 보기 →"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/page.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    recentConsultations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["emptyBox"],
                        children: "아직 상담 문의가 없습니다."
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 space-y-2",
                        children: recentConsultations.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/admin/consultations/${c.id}`,
                                className: `block rounded border p-3 transition-colors ${c.is_read ? "border-[#E5E7EA] bg-white" : "border-[#CC0000] bg-red-50"} hover:border-[#CC0000]`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-[#231F20]",
                                                children: [
                                                    c.name || "익명",
                                                    " ",
                                                    c.phone && `(${c.phone})`,
                                                    c.brand_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 rounded bg-[#CC0000] px-1.5 py-0.5 text-[10px] font-bold text-white",
                                                        children: c.brand_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/(protected)/page.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[#9E9F9C]",
                                                children: c.created_at
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/(protected)/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    c.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 truncate text-sm text-[#585958]",
                                        children: c.message
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/app/admin/(protected)/page.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/page.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/admin/(protected)/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/admin/(protected)/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00k8toa._.js.map