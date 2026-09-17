import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listGalleryImages, deleteGalleryImage } from "@/lib/db/gallery";
import { exportGallery } from "@/lib/db/json-export";
import { imageUrl } from "@/lib/storage";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const images = listGalleryImages({ q: sp.q });

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteGalleryImage(id);
    exportGallery();
    revalidatePath("/admin/gallery");
    redirect("/admin/gallery?msg=deleted");
  }

  const columns: Column[] = [
    { key: "image", label: "이미지" },
    { key: "title", label: "제목" },
    { key: "category", label: "카테고리" },
    { key: "branch", label: "매장" },
  ];

  const rows: RowVM[] = images.map((img) => ({
    id: img.id,
    href: `/admin/gallery/${img.id}/edit`,
    mobileTitle: img.title || `사진 #${img.id}`,
    mobileMeta: img.category || "",
    cells: [
      img.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl(img.image_url)} alt="" className="h-10 w-16 rounded object-cover" />
      ) : "—",
      img.title || `사진 #${img.id}`,
      img.category || "—",
      img.branch || "—",
    ],
    actions: (
      <div className="space-y-1">
        <form action={deleteAction}>
          <input type="hidden" name="id" value={img.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">사진 갤러리</h1>
        <CreateButton href="/admin/gallery/new">새 사진</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="사진 검색" />
      <DataTable columns={columns} rows={rows} total={images.length} tableId="gallery" />
    </div>
  );
}
