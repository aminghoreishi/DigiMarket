import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();

    const { title, href, category } = body;

    await subCategoryModel.create({ title, href, category });

    return NextResponse.json({ message: "Created sussfualy" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
