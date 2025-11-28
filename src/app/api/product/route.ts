import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import productModel from "@/models/product";
export async function POST(req: NextRequest) {
  try {
    await db();

    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const price = formData.get("price")?.toString() || "0";
    const name = formData.get("name")?.toString() || "";
    const count = formData.get("count")?.toString() || "";
    const delivery = formData.get("delivery")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const longDescription = formData.get("longDescription")?.toString() || "";
    const shortDescription = formData.get("shortDescription")?.toString() || "";
    const tags = formData.get("tags")?.toString() || "[]";
    const colorsRaw = formData.get("colors")?.toString() || "[]";
    const featuresRaw = formData.get("features")?.toString() || "[]";

    let colors: string[] = [];
    let features: Array<{ name: string; value: string }> = [];

    try {
      colors = JSON.parse(colorsRaw);
      features = JSON.parse(featuresRaw);
    } catch (e) {
      return NextResponse.json(
        { message: "خطا در تجزیه JSON" },
        { status: 400 }
      );
    }

    const images = formData.getAll("images") as File[];
    const imagePaths: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${image.name}`;
      const filepath = path.join(
        process.cwd(),
        "public/uploads/product",
        filename
      );
      await writeFile(filepath, buffer);

      imagePaths.push(`/uploads/product/${filename}`);
    }

    await productModel.create({
      title,
      price,
      count,
      name,
      delivery,
      category,
      longDescription,
      shortDescription,
      tags: JSON.parse(formData.get("tags")?.toString() || "[]"),
      colors,
      features,
      images: imagePaths,
    });

    return NextResponse.json(
      {
        message: "محصول با موفقیت ایجاد شد",
        data: {
          title,
          price,
          count,
          delivery,
          category,
          longDescription,
          shortDescription,
          colors,
          features,
          images: imagePaths,
        },
      },
      { status: 201 }
    );
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

export async function GET() {
  try {
    await db();
    const products = await productModel.find({}).lean();
    return NextResponse.json(products, { status: 200 });
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
