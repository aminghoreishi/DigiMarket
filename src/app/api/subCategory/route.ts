import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await db();
    const formData = await req.formData();

    const title = formData.get("title");
    const href = formData.get("href");
    const category = formData.get("category");
    const img = formData.get("img");
    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now() + img.name;

    await writeFile(
      path.join(process.cwd(), "public/uploads/category/" + fileName),
      buffer
    );

    await subCategoryModel.create({
      title,
      href,
      category,
      img: `http://localhost:3000/uploads/category/${fileName}`,
    });

    return NextResponse.json({ message: "Created sussfualy" }, { status: 201 });
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
