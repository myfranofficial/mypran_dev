export type BrandTier = "best" | "premium" | "special";

export type CostBreakdown = {
  label: string;
  value: string;
};

export type Brand = {
  id: string;
  name: string;
  tier: BrandTier;
  order: number;
  categoryId: string;
  categoryName: string;
  tagline: string;
  description: string;
  foundingCost: string;
  foundingCostMin: number; // 만원
  listingFeePerMonth: number; // 만원/월 (입점비용)
  storeCount: number;
  storeType: string;
  features: string[];
  phone: string;
  logo?: string;
  mainImage?: string;
  images?: string[];
  isFeatured: boolean;
  costBreakdown: CostBreakdown[];
  franchiseFee: string;
  educationFee: string;
  royalty: string;
  standardArea: string;
  vatIncluded: boolean;
  depositIncluded: boolean;
  startupProcess: string[];
  headquarters: string[];
};
