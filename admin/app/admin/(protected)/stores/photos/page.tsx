import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listStores } from "@/lib/db/stores";
import { listStorePhotos, createStorePhoto, deleteStorePhoto, setRepresentative } from "@/lib/db/store-photos";
import { exportStores, exportGallery } from "@/lib/db/json-export";
import { imageUrl } from "@/lib/storage/url";
import * as s from "../../ui/styles";

export default async function StorePhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ store?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const stores = listStores();
  const selectedStoreId = sp.store ? Number(sp.store) : stores[0]?.id;
  const photos = selectedStoreId ? listStorePhotos(selectedStoreId) : [];
  const selectedStore = stores.find((s) => s.id === selectedStoreId);

  async function addPhotoAction(formData: FormData) {
    "use server";
    await requireWrite();
    const storeId = Number(formData.get("store_id"));
    const imageKey = formData.get("image_url") as string;
    const title = (formData.get("title") as string) || null;
    const isRep = formData.get("is_representative") === "1" ? 1 : 0;
    if (!imageKey) return redirect(`/admin/stores/photos?store=${storeId}&msg=error`);
    createStorePhoto({ store_id: storeId, image_url: imageKey, title, is_representative: isRep });
    exportStores();
    exportGallery();
    revalidatePath("/admin/stores/photos");
    redirect(`/admin/stores/photos?store=${storeId}&msg=added`);
  }

  async function deletePhotoAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const storeId = Number(formData.get("store_id"));
    deleteStorePhoto(id);
    exportStores();
    exportGallery();
    revalidatePath("/admin/stores/photos");
    redirect(`/admin/stores/photos?store=${storeId}&msg=deleted`);
  }

  async function setRepAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const storeId = Number(formData.get("store_id"));
    setRepresentative(storeId, id);
    exportStores();
    exportGallery();
    revalidatePath("/admin/stores/photos");
    redirect(`/admin/stores/photos?store=${storeId}&msg=representative`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={s.pageTitle}>매장 사진 관리</h1>
      </div>

      {sp.msg && (
        <div className={sp.msg === "error" ? s.errorBox : s.successBox}>
          {sp.msg === "added" && "사진이 추가되었습니다."}
          {sp.msg === "deleted" && "사진이 삭제되었습니다."}
          {sp.msg === "representative" && "대표사진이 변경되었습니다."}
          {sp.msg === "error" && "이미지를 선택해주세요."}
        </div>
      )}

      {/* 매장 선택 탭 */}
      <div className="flex flex-wrap gap-2">
        {stores.map((store) => (
          <a
            key={store.id}
            href={`/admin/stores/photos?store=${store.id}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              store.id === selectedStoreId
                ? "bg-[#2A2520] text-white"
                : "bg-white border border-[#E5E7EA] text-[#6B7280] hover:bg-[#F9FAFB]"
            }`}
          >
            {store.name}
          </a>
        ))}
      </div>

      {selectedStore && (
        <>
          {/* 현재 사진 목록 */}
          <div className="rounded-lg border border-[#E5E7EA] bg-white p-5 space-y-4">
            <h2 className="text-lg font-semibold text-[#111827]">
              {selectedStore.name} 사진 ({photos.length}장)
            </h2>

            {photos.length === 0 ? (
              <p className="text-sm text-[#6B7280]">등록된 사진이 없습니다.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-lg overflow-hidden border border-[#E5E7EA]">
                    <div className="aspect-[4/3] bg-[#F3F4F6]">
                      <img
                        src={imageUrl(photo.image_url)}
                        alt={photo.title || "매장 사진"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {photo.is_representative === 1 && (
                      <span className="absolute top-2 left-2 rounded bg-[#2A2520] px-2 py-0.5 text-xs font-medium text-white">
                        대표
                      </span>
                    )}
                    <div className="p-2 space-y-1">
                      <p className="text-xs text-[#374151] truncate">{photo.title || "제목 없음"}</p>
                      <div className="flex gap-1">
                        {photo.is_representative !== 1 && (
                          <form action={setRepAction}>
                            <input type="hidden" name="id" value={photo.id} />
                            <input type="hidden" name="store_id" value={selectedStoreId} />
                            <button type="submit" className="text-xs text-blue-600 hover:underline">
                              대표 지정
                            </button>
                          </form>
                        )}
                        <form action={deletePhotoAction}>
                          <input type="hidden" name="id" value={photo.id} />
                          <input type="hidden" name="store_id" value={selectedStoreId} />
                          <button
                            type="submit"
                            className="text-xs text-red-600 hover:underline"
                          >
                            삭제
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 사진 추가 폼 */}
          <div className="rounded-lg border border-[#E5E7EA] bg-white p-5 space-y-4">
            <h2 className="text-lg font-semibold text-[#111827]">사진 추가</h2>
            <form action={addPhotoAction} className="space-y-4">
              <input type="hidden" name="store_id" value={selectedStoreId} />

              <div className="space-y-1.5">
                <label htmlFor="title" className={s.label}>제목 (선택)</label>
                <input id="title" name="title" className={s.input} placeholder="예: 외관 사진" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="image_url" className={s.label}>이미지 URL</label>
                <input id="image_url" name="image_url" className={s.input} required placeholder="/static/images/stores/example.jpg" />
                <p className="text-xs text-[#6B7280]">이미지 경로를 직접 입력하세요. (향후 업로드 기능 추가 예정)</p>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_representative" name="is_representative" value="1" className="rounded" />
                <label htmlFor="is_representative" className="text-sm text-[#374151]">대표사진으로 설정</label>
              </div>

              <div className="flex justify-end">
                <button type="submit" className={s.btnPrimary}>추가</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
