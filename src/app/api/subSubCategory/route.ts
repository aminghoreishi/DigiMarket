import db from "@/config/db";
import subSubCategoryModel from "@/models/subSubCategory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();

    const { title, href, subCategory } = body;

    await subSubCategoryModel.create({ title, href, subCategory });

    return NextResponse.json({ message: "c" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
