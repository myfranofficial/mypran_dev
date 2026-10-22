import fs from "fs";
import path from "path";
import type { Brand, BrandTier } from "./brand-types";

function getDataPath(): string {
  const candidates = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "brands.json"),
    path.join(/*turbopackIgnore: true*/ process.cwd(), "web", "data", "brands.json"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return candidates[0];
}

const TIER_ORDER: Record<BrandTier, number> = { best: 0, premium: 1, special: 2 };

export function readBrands(): Brand[] {
  const raw = fs.readFileSync(getDataPath(), "utf-8");
  const brands: Brand[] = JSON.parse(raw);
  // Sort: best → premium → special, then by order within each tier
  return brands.sort((a, b) => {
    const tierDiff = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    if (tierDiff !== 0) return tierDiff;
    return a.order - b.order;
  });
}

export function getBrandById(id: string): Brand | undefined {
  const brands = readBrands();
  return brands.find((b) => b.id === id);
}

export function writeBrands(brands: Brand[]): void {
  const sorted = [...brands].sort((a, b) => {
    const tierDiff = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    if (tierDiff !== 0) return tierDiff;
    return a.order - b.order;
  });
  fs.writeFileSync(getDataPath(), JSON.stringify(sorted, null, 2), "utf-8");
}

export function addBrand(brand: Omit<Brand, "id">): Brand {
  const brands = readBrands();
  // Generate next id
  const maxNum = brands.reduce((max, b) => {
    const n = parseInt(b.id.replace("brand-", ""), 10);
    return n > max ? n : max;
  }, 0);
  const newBrand: Brand = {
    ...brand,
    id: `brand-${String(maxNum + 1).padStart(3, "0")}`,
  };
  brands.push(newBrand);
  writeBrands(brands);
  return newBrand;
}

export function updateBrand(id: string, updates: Partial<Brand>): Brand | null {
  const brands = readBrands();
  const idx = brands.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  brands[idx] = { ...brands[idx], ...updates, id }; // id is immutable
  writeBrands(brands);
  return brands[idx];
}

export function deleteBrand(id: string): boolean {
  const brands = readBrands();
  const filtered = brands.filter((b) => b.id !== id);
  if (filtered.length === brands.length) return false;
  writeBrands(filtered);
  return true;
}
