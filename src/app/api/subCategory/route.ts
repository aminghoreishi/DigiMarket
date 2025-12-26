import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const href = formData.get("href") as string;
    const category = formData.get("category") as string;
    const img = formData.get("img");

    if (!title) {
      return NextResponse.json(
        { message: "Title الزامی است" },
        { status: 400 }
      );
    }

    const existSub = await subCategoryModel.findOne({ title });
    if (existSub) {
      return NextResponse.json(
        { message: "این زیر دسته‌بندی قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;

    if (img instanceof File && img.size > 0) {
      const bytes = await img.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "digimarket/category" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    }

    await subCategoryModel.create({
      title,
      href,
      category,
      ...(imageUrl && { img: imageUrl }),
    });

    return NextResponse.json(
      { message: "Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");

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
      .limit(6)
      .populate("category")
      .lean()
      .exec();

    const total = await subCategoryModel.countDocuments({});

    const totalPages = Math.ceil(total / 6);

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
