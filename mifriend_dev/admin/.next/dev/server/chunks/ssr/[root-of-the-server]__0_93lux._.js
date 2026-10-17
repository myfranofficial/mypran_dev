module.exports = [
"[project]/lib/db/settings.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllSettings",
    ()=>getAllSettings,
    "getSetting",
    ()=>getSetting,
    "getSettings",
    ()=>getSettings,
    "setSetting",
    ()=>setSetting,
    "setSettings",
    ()=>setSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/index.ts [app-rsc] (ecmascript)");
;
;
function getSetting(key) {
    const row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])().prepare("SELECT value FROM settings WHERE key = ?").get(key);
    return row?.value ?? null;
}
function setSetting(key, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])().prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(key, value);
}
function getSettings(keys) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const result = {};
    for (const key of keys){
        const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key);
        if (row?.value != null) result[key] = row.value;
    }
    return result;
}
function setSettings(entries) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const stmt = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
    const tx = db.transaction(()=>{
        for (const [k, v] of Object.entries(entries)){
            stmt.run(k, v);
        }
    });
    tx();
}
function getAllSettings() {
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])().prepare("SELECT key, value FROM settings").all();
    const result = {};
    for (const row of rows){
        if (row.value != null) result[row.key] = row.value;
    }
    return result;
}
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[project]/lib/storage/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IMAGE_BASE_URL",
    ()=>IMAGE_BASE_URL,
    "STORAGE_DRIVER",
    ()=>STORAGE_DRIVER,
    "UPLOAD_DIR",
    ()=>UPLOAD_DIR
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
const STORAGE_DRIVER = process.env.STORAGE_DRIVER ?? "local";
const UPLOAD_DIR = process.env.UPLOAD_DIR ?? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "uploads");
const IMAGE_BASE_URL = (process.env.IMAGE_BASE_URL ?? "/uploads").replace(/\/+$/, "");
}),
"[project]/lib/storage/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteImage",
    ()=>deleteImage,
    "deleteImages",
    ()=>deleteImages,
    "imageUrl",
    ()=>imageUrl,
    "isLocalKey",
    ()=>isLocalKey,
    "saveImage",
    ()=>saveImage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage/config.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const ABSOLUTE_URL = /^https?:\/\//i;
function isLocalKey(value) {
    return !!value && !ABSOLUTE_URL.test(value);
}
function imageUrl(key) {
    if (ABSOLUTE_URL.test(key)) return key;
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IMAGE_BASE_URL"]}/${key.replace(/^\/+/, "")}`;
}
async function saveImage(buffer, ext) {
    const now = new Date();
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const name = `${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(12).toString("hex")}.${ext.replace(/^\./, "")}`;
    const key = `${yyyy}/${mm}/${name}`;
    const dest = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UPLOAD_DIR"], key);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(dest), {
        recursive: true
    });
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(dest, buffer);
    return key;
}
async function deleteImage(key) {
    if (!isLocalKey(key)) return;
    const target = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UPLOAD_DIR"], key);
    const resolved = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(target);
    if (!resolved.startsWith(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UPLOAD_DIR"]))) return;
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].unlink(resolved);
    } catch  {
    // already gone or inaccessible
    }
}
async function deleteImages(keys) {
    await Promise.all(keys.map((k)=>deleteImage(k)));
}
}),
"[project]/lib/db/json-export.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportAll",
    ()=>exportAll,
    "exportBanners",
    ()=>exportBanners,
    "exportBrands",
    ()=>exportBrands,
    "exportDownloads",
    ()=>exportDownloads,
    "exportFaq",
    ()=>exportFaq,
    "exportNotices",
    ()=>exportNotices,
    "exportSite",
    ()=>exportSite
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage/index.ts [app-rsc] (ecmascript)");
;
;
;
;
;
/**
 * DB → JSON 자동 재생성 시스템.
 * 어드민에서 저장 시 관련 JSON 파일을 atomic write 한다.
 * 프론트엔드는 JSON fetch를 그대로 사용.
 */ const EXPORT_DIR = process.env.JSON_EXPORT_DIR ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.env.JSON_EXPORT_DIR) : __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "..", "src", "static", "data");
function writeJson(filename, data) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(EXPORT_DIR, {
        recursive: true
    });
    const target = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(EXPORT_DIR, filename);
    const tmp = target + ".tmp";
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].renameSync(tmp, target);
}
function getSetting(k, fallback = "") {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(k);
    return row?.value || fallback;
}
function resolveUrl(key) {
    if (!key) return "";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageUrl"])(key);
}
function exportSite() {
    writeJson("site.json", {
        phone: getSetting("phone", "010-4708-6091"),
        address: getSetting("address", ""),
        addressDetail: getSetting("address_detail", ""),
        hours: getSetting("business_hours", "평일 09:00 ~ 18:00"),
        slogan: getSetting("slogan", "당신의 성공 창업, 마이프랜이 함께합니다"),
        copyright: getSetting("copyright", "© 2026 마이프랜. All rights reserved."),
        sns: {
            kakao: getSetting("sns_kakao_channel"),
            instagram: getSetting("sns_instagram"),
            youtube: getSetting("sns_youtube"),
            blog: getSetting("sns_blog")
        }
    });
}
function exportBanners() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const now = new Date().toISOString().slice(0, 10);
    const banners = db.prepare(`SELECT * FROM banners WHERE is_active = 1
     AND (start_at IS NULL OR start_at <= ?)
     AND (end_at IS NULL OR end_at >= ?)
     ORDER BY sort_order ASC, id ASC`).all(now, now);
    writeJson("banners.json", {
        banners: banners.map((b)=>({
                title: b.title || "",
                subtitle: b.subtitle || "",
                image: resolveUrl(b.image_url),
                imageMobile: b.image_url_mobile ? resolveUrl(b.image_url_mobile) : "",
                link: b.link_url || ""
            }))
    });
}
function exportBrands() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const categories = db.prepare("SELECT * FROM brand_categories WHERE is_active = 1 ORDER BY sort_order ASC, id ASC").all();
    const brands = db.prepare(`SELECT b.*, c.name AS category_name
       FROM brands b
       LEFT JOIN brand_categories c ON b.category_id = c.id
       WHERE b.is_active = 1
       ORDER BY b.sort_order ASC, b.id ASC`).all();
    writeJson("brands.json", {
        categories: categories.map((c)=>({
                id: c.id,
                name: c.name
            })),
        brands: brands.map((b)=>({
                id: b.id,
                categoryId: b.category_id,
                categoryName: b.category_name || "",
                name: b.name,
                tagline: b.tagline || "",
                description: b.description || "",
                foundingCost: b.founding_cost || "",
                storeCount: b.store_count || 0,
                logo: resolveUrl(b.logo_url),
                mainImage: resolveUrl(b.main_image_url),
                images: b.images ? JSON.parse(b.images).map(resolveUrl) : [],
                features: b.features ? JSON.parse(b.features) : [],
                phone: b.phone || "",
                kakaoUrl: b.kakao_url || "",
                isFeatured: !!b.is_featured
            }))
    });
}
function exportNotices() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const notices = db.prepare("SELECT * FROM notices WHERE is_active = 1 ORDER BY is_pinned DESC, created_at DESC, id DESC").all();
    writeJson("notices.json", {
        notices: notices.map((n)=>({
                id: n.id,
                category: n.category || "공지",
                title: n.title,
                content: n.content || "",
                date: n.date || n.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
                isPinned: !!n.is_pinned
            }))
    });
}
function exportFaq() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const items = db.prepare("SELECT * FROM faq_items ORDER BY sort_order ASC, id ASC").all();
    const categories = [
        "전체",
        ...new Set(items.map((i)=>i.category).filter(Boolean))
    ];
    writeJson("faq.json", {
        categories,
        items: items.map((i)=>({
                category: i.category || "",
                question: i.question,
                answer: i.answer || ""
            }))
    });
}
function exportDownloads() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    const files = db.prepare("SELECT * FROM downloads ORDER BY created_at DESC, id DESC").all();
    writeJson("downloads.json", {
        files: files.map((f)=>({
                title: f.title,
                desc: f.description || "",
                filename: f.filename || "",
                url: f.file_url || "",
                size: f.file_size || "",
                date: f.created_at?.split(" ")[0]?.replace(/-/g, ".") || "",
                downloads: f.download_count || 0
            }))
    });
}
function exportAll() {
    try {
        exportSite();
    } catch (e) {
        console.error("[json-export] site:", e);
    }
    try {
        exportBanners();
    } catch (e) {
        console.error("[json-export] banners:", e);
    }
    try {
        exportBrands();
    } catch (e) {
        console.error("[json-export] brands:", e);
    }
    try {
        exportNotices();
    } catch (e) {
        console.error("[json-export] notices:", e);
    }
    try {
        exportFaq();
    } catch (e) {
        console.error("[json-export] faq:", e);
    }
    try {
        exportDownloads();
    } catch (e) {
        console.error("[json-export] downloads:", e);
    }
}
}),
"[project]/app/admin/(protected)/ui/preview-link.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldHint",
    ()=>FieldHint,
    "PreviewIframe",
    ()=>PreviewIframe,
    "PreviewLink",
    ()=>PreviewLink
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FieldHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FieldHint() from the server but FieldHint is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/preview-link.tsx <module evaluation>", "FieldHint");
const PreviewIframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PreviewIframe() from the server but PreviewIframe is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/preview-link.tsx <module evaluation>", "PreviewIframe");
const PreviewLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PreviewLink() from the server but PreviewLink is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/preview-link.tsx <module evaluation>", "PreviewLink");
}),
"[project]/app/admin/(protected)/ui/preview-link.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldHint",
    ()=>FieldHint,
    "PreviewIframe",
    ()=>PreviewIframe,
    "PreviewLink",
    ()=>PreviewLink
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FieldHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FieldHint() from the server but FieldHint is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/preview-link.tsx", "FieldHint");
const PreviewIframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PreviewIframe() from the server but PreviewIframe is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/preview-link.tsx", "PreviewIframe");
const PreviewLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PreviewLink() from the server but PreviewLink is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/preview-link.tsx", "PreviewLink");
}),
"[project]/app/admin/(protected)/ui/preview-link.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$preview$2d$link$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/preview-link.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$preview$2d$link$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/preview-link.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$preview$2d$link$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/admin/(protected)/ui/save-preview.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SavePreview",
    ()=>SavePreview
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SavePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SavePreview() from the server but SavePreview is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/save-preview.tsx <module evaluation>", "SavePreview");
}),
"[project]/app/admin/(protected)/ui/save-preview.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SavePreview",
    ()=>SavePreview
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SavePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SavePreview() from the server but SavePreview is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/admin/(protected)/ui/save-preview.tsx", "SavePreview");
}),
"[project]/app/admin/(protected)/ui/save-preview.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$save$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/save-preview.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$save$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/save-preview.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$save$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
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
"[project]/app/admin/(protected)/settings/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "default",
    ()=>SettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"405a4c3025d7148fee4b5394827595c2646d52d441":{"name":"$$RSC_SERVER_ACTION_0"}},"app/admin/(protected)/settings/page.tsx",""] */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$json$2d$export$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/json-export.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$preview$2d$link$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/preview-link.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$save$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/save-preview.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/ui/styles.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const SETTINGS_KEYS = [
    "phone",
    "kakao_id",
    "sms_number",
    "address",
    "address_detail",
    "business_hours",
    "slogan",
    "slogan_sub",
    "slogan_en",
    "copyright",
    "sns_instagram",
    "sns_youtube",
    "sns_blog",
    "sns_kakao_channel",
    "terms",
    "privacy_policy"
];
const $$RSC_SERVER_ACTION_0 = async function saveAction(formData) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireWrite"])();
    const entries = {};
    for (const key of SETTINGS_KEYS){
        entries[key] = String(formData.get(key) ?? "").trim();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setSettings"])(entries);
    // 설정 변경 시 모든 JSON에 contact 정보가 반영되므로 전체 재생성
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$json$2d$export$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["exportAll"])();
    } catch (e) {
        console.error("[settings] exportAll:", e);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/settings");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/settings?msg=saved");
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "405a4c3025d7148fee4b5394827595c2646d52d441", null);
async function SettingsPage({ searchParams }) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireWrite"])();
    const sp = await searchParams;
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSettings"])(SETTINGS_KEYS);
    var saveAction = $$RSC_SERVER_ACTION_0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-[800px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-[#231F20]",
                                children: "설정"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-[#9E9F9C]",
                                children: "사이트 기본 정보 관리. 저장하면 모든 페이지 하단 연락처에 반영됩니다."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$preview$2d$link$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PreviewLink"], {
                        path: "/",
                        label: "사이트 보기"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            sp.msg === "saved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["okBox"]}`,
                children: "저장되었습니다. 모든 페이지 하단에 즉시 반영됩니다."
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                lineNumber: 64,
                columnNumber: 30
            }, this),
            sp.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-4 ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["errorBox"]}`,
                children: sp.error
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                lineNumber: 65,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$save$2d$preview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SavePreview"], {
                previewPath: "/",
                saved: sp.msg === "saved"
            }, void 0, false, {
                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                action: saveAction,
                className: "mt-6 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "text-sm font-bold text-[#231F20]",
                                children: "연락처"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "phone",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "대표 전화번호"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "phone",
                                        name: "phone",
                                        defaultValue: settings.phone ?? "010-4708-6091",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "kakao_id",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "카카오톡 ID"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "kakao_id",
                                        name: "kakao_id",
                                        defaultValue: settings.kakao_id ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sms_number",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "SMS 수신 번호"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "sms_number",
                                        name: "sms_number",
                                        defaultValue: settings.sms_number ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "address",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "주소"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "address",
                                        name: "address",
                                        defaultValue: settings.address ?? "서울시 종로구 종로 191, 2층",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "address_detail",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "주소 부가정보"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "address_detail",
                                        name: "address_detail",
                                        defaultValue: settings.address_detail ?? "(종로5가역 12번출구)",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"],
                                        placeholder: "(종로5가역 12번출구)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "business_hours",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "영업시간"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "business_hours",
                                        name: "business_hours",
                                        defaultValue: settings.business_hours ?? "평일 09:00 ~ 18:00",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "text-sm font-bold text-[#231F20]",
                                children: "브랜드 텍스트"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#9E9F9C]",
                                children: "사이트 전체 푸터·공통 영역에 표시되는 슬로건과 저작권 문구입니다."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "slogan",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "슬로건 (1줄)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "slogan",
                                        name: "slogan",
                                        defaultValue: settings.slogan ?? "당구, 그 이상의 가치!",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "slogan_sub",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "서브 슬로건 (2줄)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "slogan_sub",
                                        name: "slogan_sub",
                                        defaultValue: settings.slogan_sub ?? "함께 만드는 성공 스토리",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "slogan_en",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "영문 슬로건"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "slogan_en",
                                        name: "slogan_en",
                                        defaultValue: settings.slogan_en ?? "Premium Billiards Life",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "copyright",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "저작권 문구"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "copyright",
                                        name: "copyright",
                                        defaultValue: settings.copyright ?? "© 2025 HI Q BILLIARDS. All rights reserved.",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "text-sm font-bold text-[#231F20]",
                                children: "SNS 링크"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#9E9F9C]",
                                children: "각 항목에 전체 URL을 입력하세요. 비워두면 해당 링크가 사이트에서 숨겨집니다."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sns_kakao_channel",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "카카오톡 오픈채팅"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "sns_kakao_channel",
                                        name: "sns_kakao_channel",
                                        defaultValue: settings.sns_kakao_channel ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"],
                                        placeholder: "https://open.kakao.com/o/..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sns_instagram",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "인스타그램"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "sns_instagram",
                                        name: "sns_instagram",
                                        defaultValue: settings.sns_instagram ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"],
                                        placeholder: "https://www.instagram.com/..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sns_youtube",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "유튜브"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "sns_youtube",
                                        name: "sns_youtube",
                                        defaultValue: settings.sns_youtube ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"],
                                        placeholder: "https://www.youtube.com/..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sns_blog",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "블로그"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "sns_blog",
                                        name: "sns_blog",
                                        defaultValue: settings.sns_blog ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["input"],
                                        placeholder: "https://blog.naver.com/..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "text-sm font-bold text-[#231F20]",
                                children: "약관"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "terms",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "이용약관"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "terms",
                                        name: "terms",
                                        rows: 8,
                                        defaultValue: settings.terms ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["textarea"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "privacy_policy",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["label"],
                                        children: "개인정보처리방침"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "privacy_policy",
                                        name: "privacy_policy",
                                        rows: 8,
                                        defaultValue: settings.privacy_policy ?? "",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["textarea"]
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$ui$2f$styles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["btnPrimary"],
                            children: "저장"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/(protected)/settings/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/(protected)/settings/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/.next-internal/server/app/admin/(protected)/settings/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/(protected)/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/admin/(protected)/settings/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/settings/page.tsx [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/admin/(protected)/settings/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/(protected)/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/admin/(protected)/settings/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00e79f1db9d20964729ac501ca762eb839ccd6a3e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAction"],
    "405a4c3025d7148fee4b5394827595c2646d52d441",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f28$protected$292f$settings$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$admin$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$admin$2f28$protected$292f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/(protected)/settings/page/actions.js { ACTIONS_MODULE0 => "[project]/app/admin/(protected)/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/admin/(protected)/settings/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f28$protected$292f$settings$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/(protected)/settings/page.tsx [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_93lux._.js.map