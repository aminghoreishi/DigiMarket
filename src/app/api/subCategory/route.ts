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
    const img = formData.get("img") as File;
    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now() + img.name;

    const subs = await subCategoryModel.findOne({ title });

    if (subs) {
      return NextResponse.json(
        { message: "این زیر دسته بندی قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

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

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const page = JSON.parse(searchParams.get("page")) || 1;

    if (+page < 1) {
      return NextResponse.json(
        { message: "Page and limit must be positive integers" },
        { status: 400 }
      );
    }

    const skip = (Number(page) - 1) * 3;

    const subCategories = await subCategoryModel
      .find({})
      .skip(skip)
      .limit(3)
      .populate("category")
      .lean()
      .exec();

    const total = await subCategoryModel.countDocuments({});

    const totalPages = Math.ceil(total / 3);

    return NextResponse.json({ subCategories, totalPages }, { status: 200 });
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
