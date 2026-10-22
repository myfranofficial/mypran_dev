import { NextResponse } from "next/server";
import { getBrandById, updateBrand, deleteBrand } from "@/lib/brands-store";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  const brand = getBrandById(id);
  if (!brand) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }
  return NextResponse.json(brand);
}

export async function PUT(request: Request, context: Context) {
  const { id } = await context.params;
  const body = await request.json();
  const updated = updateBrand(id, body);
  if (!updated) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params;
  const deleted = deleteBrand(id);
  if (!deleted) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
