import type { Metadata } from "next";
import { readBrands, getBrandById } from "@/lib/brands-store";
import BrandDetailClient from "./BrandDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const brands = readBrands();
  return brands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const brand = getBrandById(id);

  if (!brand) {
    return { title: "브랜드를 찾을 수 없습니다" };
  }

  return {
    title: `${brand.name} — 창업비용·브랜드 상세정보`,
    description: `${brand.name} 프랜차이즈 창업비용 ${brand.foundingCost}, 매장 수 ${brand.storeCount.toLocaleString()}개. ${brand.tagline}`,
    openGraph: {
      title: `${brand.name} | 마이프랜`,
      description: `${brand.name} 창업비용 ${brand.foundingCost}. ${brand.tagline}`,
    },
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { id } = await params;
  const brand = getBrandById(id);
  return <BrandDetailClient brand={brand ?? null} />;
}
