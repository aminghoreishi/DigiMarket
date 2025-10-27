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
    return NextResponse.json({ message: error.message });
  }
}
