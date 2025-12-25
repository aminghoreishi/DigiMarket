import db from "@/config/db";
import brandModel from "@/models/brand";
import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const img = formData.get("img") as File;

    if (!img) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "digimarket/brand",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    await brandModel.create({
      title,
      img: uploadRes.secure_url, // ✅ Cloudinary URL
    });

    return NextResponse.json(
      { message: "Create Successfully" },
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

    const skip = (page - 1) * 7;

    const brands = await brandModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(7);

    const totalBrands = await brandModel.countDocuments({});
    const totalPages = Math.ceil(totalBrands / 7);

    return NextResponse.json({ brands, totalPages }, { status: 200 });
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
