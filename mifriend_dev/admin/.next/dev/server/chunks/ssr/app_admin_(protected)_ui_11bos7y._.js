module.exports = [
"[project]/app/admin/(protected)/ui/search-bar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchBar",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function SearchBar({ placeholder = "검색", filters = [] }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sp.get("q") ?? "");
    const firstRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    function apply(patch) {
        const params = new URLSearchParams(sp.toString());
        for (const [k, v] of Object.entries(patch)){
            if (v) params.set(k, v);
            else params.delete(k);
        }
        params.delete("msg");
        params.delete("error");
        params.delete("page");
        const query = params.toString();
        startTransition(()=>{
            router.replace(query ? `${pathname}?${query}` : pathname);
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        const t = setTimeout(()=>{
            if ((sp.get("q") ?? "") !== q) apply({
                q
            });
        }, 300);
        return ()=>clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        q
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 flex flex-col gap-2 sm:flex-row sm:items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9F9C]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 18 18",
                            fill: "none",
                            "aria-hidden": true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "8",
                                    cy: "8",
                                    r: "6",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "12.5",
                                    y1: "12.5",
                                    x2: "17",
                                    y2: "17",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "search",
                        value: q,
                        onChange: (e)=>setQ(e.target.value),
                        placeholder: placeholder,
                        className: "min-h-11 w-full rounded border border-[#DCDCD7] bg-white pl-9 pr-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            filters.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: sp.get(f.name) ?? "",
                    onChange: (e)=>apply({
                            [f.name]: e.target.value
                        }),
                    className: "min-h-11 rounded border border-[#DCDCD7] bg-white px-3 text-sm text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: f.allLabel
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        f.options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: o.value,
                                children: o.label
                            }, o.value, false, {
                                fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this))
                    ]
                }, f.name, true, {
                    fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/search-bar.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/admin/(protected)/ui/styles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/app/admin/(protected)/ui/row-menu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RowMenu",
    ()=>RowMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/styles.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function RowMenu({ children, label = "관리 메뉴" }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const onDoc = (e)=>{
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e)=>{
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onKey);
        return ()=>{
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onKey);
        };
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative inline-block text-left",
        "data-no-rownav": true,
        onClick: (e)=>e.stopPropagation(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-haspopup": "menu",
                "aria-expanded": open,
                "aria-label": label,
                onClick: ()=>setOpen((v)=>!v),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kebabBtn"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    "aria-hidden": true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "5",
                            cy: "12",
                            r: "1.7"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "1.7"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "19",
                            cy: "12",
                            r: "1.7"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "menu",
                className: "absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded border border-[#E5E7EA] bg-white py-1 shadow-lg",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/row-menu.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/admin/(protected)/ui/data-table.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataTable",
    ()=>DataTable,
    "useSelection",
    ()=>useSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$row$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/row-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/styles.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const SelectionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    ids: [],
    clear: ()=>{}
});
function useSelection() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SelectionContext);
}
const alignClass = (a)=>a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";
function useRowNav(href) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const guard = (t)=>t?.closest("a,button,input,select,textarea,label,[data-no-rownav]");
    return {
        onClick: (e)=>{
            if (!guard(e.target)) router.push(href);
        },
        onKeyDown: (e)=>{
            if (e.key === "Enter" && !guard(e.target)) router.push(href);
        }
    };
}
function DataTable({ columns, rows, total, tableId, selectable = false, bulkBar }) {
    const hasActions = rows.some((r)=>r.actions);
    const keys = columns.map((c, i)=>c.key ?? String(i));
    const origIndex = new Map(keys.map((k, i)=>[
            k,
            i
        ]));
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(keys);
    const [widths, setWidths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const dragKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resizing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const rowIdsKey = rows.map((r)=>r.id).join(",");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectable) return;
        setSelected((prev)=>{
            if (prev.size === 0) return prev;
            const ids = new Set(rows.map((r)=>r.id));
            const next = new Set([
                ...prev
            ].filter((id)=>ids.has(id)));
            return next.size === prev.size ? prev : next;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        rowIdsKey,
        selectable
    ]);
    const toggleOne = (id)=>setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    const allChecked = selectable && rows.length > 0 && rows.every((r)=>selected.has(r.id));
    const toggleAll = ()=>setSelected((prev)=>rows.every((r)=>prev.has(r.id)) ? new Set() : new Set(rows.map((r)=>r.id)));
    const clearSelection = ()=>setSelected(new Set());
    const storeKey = tableId ? `hiq_grid_${tableId}` : "";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!storeKey) return;
        try {
            const raw = localStorage.getItem(storeKey);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.order)) {
                const kept = parsed.order.filter((k)=>keys.includes(k));
                const added = keys.filter((k)=>!kept.includes(k));
                setOrder([
                    ...kept,
                    ...added
                ]);
            }
            if (parsed.widths) setWidths(parsed.widths);
        } catch  {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        storeKey,
        keys.join(",")
    ]);
    const persist = (o, w)=>{
        if (storeKey) {
            try {
                localStorage.setItem(storeKey, JSON.stringify({
                    order: o,
                    widths: w
                }));
            } catch  {}
        }
    };
    const reset = ()=>{
        setOrder(keys);
        setWidths({});
        if (storeKey) try {
            localStorage.removeItem(storeKey);
        } catch  {}
    };
    const startResize = (key, e)=>{
        e.preventDefault();
        e.stopPropagation();
        resizing.current = true;
        const th = e.currentTarget.closest("th");
        const startX = e.clientX;
        const startW = th?.offsetWidth ?? widths[key] ?? 120;
        const onMove = (ev)=>{
            const w = Math.max(60, startW + (ev.clientX - startX));
            setWidths((prev)=>({
                    ...prev,
                    [key]: w
                }));
        };
        const onUp = ()=>{
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            setWidths((prev)=>{
                persist(order, prev);
                return prev;
            });
            setTimeout(()=>{
                resizing.current = false;
            }, 0);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    };
    const onDrop = (targetKey)=>{
        const from = dragKey.current;
        dragKey.current = null;
        if (!from || from === targetKey) return;
        const next = [
            ...order
        ];
        const fi = next.indexOf(from);
        const ti = next.indexOf(targetKey);
        if (fi < 0 || ti < 0) return;
        next.splice(fi, 1);
        next.splice(ti, 0, from);
        setOrder(next);
        persist(next, widths);
    };
    const displayKeys = order.filter((k)=>origIndex.has(k));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: total != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-[#9E9F9C]",
                            children: [
                                "총 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-[#231F20]",
                                    children: total.toLocaleString("ko-KR")
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this),
                                "개"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                            lineNumber: 170,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    tableId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: reset,
                        className: "text-xs text-[#9E9F9C] underline-offset-2 hover:text-[#585958] hover:underline",
                        children: "열 초기화"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            selectable && selected.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectionContext.Provider, {
                value: {
                    ids: [
                        ...selected
                    ],
                    clear: clearSelection
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 rounded border border-[#EF4023] bg-[#FCE4DF] p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2.5 flex items-center justify-between gap-2 border-b border-[#EF4023] pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-[#585958]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-[#231F20]",
                                            children: [
                                                selected.size,
                                                "개"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this),
                                        " 선택됨"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: clearSelection,
                                    className: "text-xs text-[#9E9F9C] underline-offset-2 hover:text-[#EF4023] hover:underline",
                                    children: "선택 해제"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        bulkBar
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden overflow-x-auto rounded border border-[#DCDCD7] bg-white shadow-sm md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["table"],
                    style: {
                        tableLayout: "auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("colgroup", {
                            children: [
                                selectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    style: {
                                        width: "40px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                    lineNumber: 198,
                                    columnNumber: 28
                                }, this),
                                displayKeys.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                        style: widths[k] ? {
                                            width: `${widths[k]}px`
                                        } : undefined
                                    }, k, false, {
                                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this)),
                                hasActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("col", {
                                    style: {
                                        width: "48px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                    lineNumber: 202,
                                    columnNumber: 28
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["thead"],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    selectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["th"]} text-center`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            "aria-label": "전체 선택",
                                            checked: allChecked,
                                            onChange: toggleAll,
                                            className: "h-4 w-4 cursor-pointer accent-[#EF4023]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                            lineNumber: 208,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this),
                                    displayKeys.map((k)=>{
                                        const c = columns[origIndex.get(k)];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            draggable: !!tableId,
                                            onDragStart: (e)=>{
                                                if (resizing.current) {
                                                    e.preventDefault();
                                                    return;
                                                }
                                                dragKey.current = k;
                                                e.dataTransfer.effectAllowed = "move";
                                            },
                                            onDragOver: (e)=>e.preventDefault(),
                                            onDrop: ()=>onDrop(k),
                                            className: `relative ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["th"]} ${alignClass(c.align)} ${c.headerClassName ?? ""} ${tableId ? "cursor-move select-none" : ""}`,
                                            children: [
                                                c.sortKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortHeader, {
                                                    sortKey: c.sortKey,
                                                    children: c.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 34
                                                }, this) : c.label,
                                                tableId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    onMouseDown: (e)=>startResize(k, e),
                                                    onDragStart: (e)=>e.preventDefault(),
                                                    className: "absolute right-0 top-0 z-10 h-full w-1.5 cursor-col-resize hover:bg-[#EF4023]",
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, k, true, {
                                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    hasActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["th"]} text-center`,
                                        children: "관리"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                        lineNumber: 238,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: rows.map((r, ri)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TableRow, {
                                    row: r,
                                    displayKeys: displayKeys,
                                    origIndex: origIndex,
                                    columns: columns,
                                    hasActions: hasActions,
                                    even: ri % 2 === 1,
                                    selectable: selectable,
                                    checked: selected.has(r.id),
                                    onToggle: ()=>toggleOne(r.id)
                                }, r.id, false, {
                                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-2.5 md:hidden",
                children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardRow, {
                        row: r,
                        selectable: selectable,
                        checked: selected.has(r.id),
                        onToggle: ()=>toggleOne(r.id)
                    }, r.id, false, {
                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
function SortHeader({ sortKey, children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const sp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const active = sp.get("sort") === sortKey;
    const dir = sp.get("dir") === "desc" ? "desc" : "asc";
    const nextDir = active && dir === "asc" ? "desc" : "asc";
    const onClick = ()=>{
        const params = new URLSearchParams(sp.toString());
        params.set("sort", sortKey);
        params.set("dir", nextDir);
        params.delete("page");
        params.delete("msg");
        params.delete("error");
        router.replace(`${pathname}?${params.toString()}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: "inline-flex items-center gap-1 font-bold text-[#585958] hover:text-[#EF4023]",
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-[10px] ${active ? "text-[#EF4023]" : "text-[#9E9F9C]"}`,
                children: active ? dir === "asc" ? "▲" : "▼" : "↕"
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
function TableRow({ row, displayKeys, origIndex, columns, hasActions, even, selectable, checked, onToggle }) {
    const nav = useRowNav(row.href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: `cursor-pointer transition-colors hover:bg-[#F7F7F5] [&:last-child>td]:border-0 ${checked ? "bg-[#FCE4DF]" : even ? "bg-[#F7F7F5]" : "bg-white"}`,
        tabIndex: 0,
        ...nav,
        children: [
            selectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["td"]} text-center`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    "aria-label": "행 선택",
                    checked: !!checked,
                    onChange: onToggle,
                    onClick: (e)=>e.stopPropagation(),
                    className: "h-4 w-4 cursor-pointer accent-[#EF4023]"
                }, void 0, false, {
                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                    lineNumber: 290,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, this),
            displayKeys.map((k, di)=>{
                const oi = origIndex.get(k);
                const c = columns[oi];
                const cell = row.cells[oi];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["td"]} ${alignClass(c.align)} ${c.className ?? ""}`,
                    children: di === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: row.href,
                        className: "block truncate font-bold text-[#231F20] underline-offset-2 hover:underline",
                        children: cell
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                        lineNumber: 300,
                        columnNumber: 15
                    }, this) : cell
                }, k, false, {
                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                    lineNumber: 298,
                    columnNumber: 11
                }, this);
            }),
            hasActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["td"]} text-center`,
                children: row.actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$row$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RowMenu"], {
                    children: row.actions
                }, void 0, false, {
                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                    lineNumber: 306,
                    columnNumber: 63
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
function CardRow({ row, selectable, checked, onToggle }) {
    const nav = useRowNav(row.href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative cursor-pointer rounded border p-4 shadow-sm transition-colors ${checked ? "border-[#EF4023] bg-[#FCE4DF]" : "border-[#DCDCD7] bg-white hover:bg-[#F7F7F5]"}`,
        role: "link",
        tabIndex: 0,
        ...nav,
        children: [
            row.actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-1.5 top-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$row$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RowMenu"], {
                    children: row.actions
                }, void 0, false, {
                    fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                    lineNumber: 316,
                    columnNumber: 65
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 316,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-start gap-2.5 ${row.actions ? "pr-10" : ""}`,
                children: [
                    selectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        "aria-label": "행 선택",
                        checked: !!checked,
                        onChange: onToggle,
                        onClick: (e)=>e.stopPropagation(),
                        className: "mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#EF4023]"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                        lineNumber: 318,
                        columnNumber: 24
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: row.href,
                        className: "block font-medium text-[#231F20]",
                        children: row.mobileTitle
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this),
            row.mobileMeta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 text-sm text-[#9E9F9C]",
                children: row.mobileMeta
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
                lineNumber: 321,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/data-table.tsx",
        lineNumber: 315,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/admin/(protected)/ui/preview-link.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldHint",
    ()=>FieldHint,
    "PreviewIframe",
    ()=>PreviewIframe,
    "PreviewLink",
    ()=>PreviewLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const SITE_URL = "https://xn--hy1b74gqvezsj69b22utri.kr";
function PreviewLink({ path, label }) {
    const url = `${SITE_URL}${path}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EA] bg-white px-3 py-1.5 text-sm font-medium text-[#585958] transition hover:border-[#EF4023] hover:text-[#EF4023]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            label || "실제 페이지 보기"
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
function PreviewIframe({ path, show }) {
    if (!show) return null;
    const url = `${SITE_URL}${path}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 overflow-hidden rounded-lg border border-[#E5E7EA]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between bg-[#F5F5F5] px-4 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-[#585958]",
                        children: "미리보기"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-xs text-[#EF4023] hover:underline",
                        children: "새 탭에서 열기 ↗"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                src: url,
                className: "h-[600px] w-full border-0",
                title: "프론트 미리보기"
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function FieldHint({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "mt-0.5 text-xs text-[#B0B0B0]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mr-1",
                children: "💡"
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            text
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/ui/preview-link.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_admin_%28protected%29_ui_11bos7y._.js.map