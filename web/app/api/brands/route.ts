import { NextResponse } from "next/server";
import { readBrands, addBrand } from "@/lib/brands-store";

export async function GET() {
  const brands = readBrands();
  return NextResponse.json(brands);
}

export async function POST(request: Request) {
  const body = await request.json();
  const brand = addBrand(body);
  return NextResponse.json(brand, { status: 201 });
}
