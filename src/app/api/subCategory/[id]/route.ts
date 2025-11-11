import subCategoryModel from "@/models/subCategory";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const subCategory = await subCategoryModel.findByIdAndDelete(id);
    if (!subCategory) {
      return NextResponse.json(
        { message: "زیردسته یافت نشد" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "زیردسته با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subCategory:", error);
    return NextResponse.json(
      { message: "خطا در حذف زیردسته" },
      { status: 500 }
    );
  }
}
