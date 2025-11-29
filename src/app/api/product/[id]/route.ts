import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "محصول با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "خطا در حذف محصول" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await productModel.find({ subCategory: id }).lean();
    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "خطا در دریافت محصول" },
      { status: 500 }
    );
  }
}
