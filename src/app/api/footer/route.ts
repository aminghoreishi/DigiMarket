import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import db from "@/config/db";
import footerModel from "@/models/footer";

export async function POST(req: NextRequest) {
  try {
    await db();

    await footerModel.deleteMany();

    const formData = await req.formData();

    const img = formData.get("img") as File;
    if (!img) throw new Error("Image not found");

    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${img.name}`;

    const uploadedImgPath = `/uploads/footer/${fileName}`;

    const featuredLinks = JSON.parse(
      formData.get("featuredLinks") as string
    ).map((item: any) => ({
      ...item,
      img: uploadedImgPath, 
    }));

    const uploadPath = path.join(
      process.cwd(),
      "public/uploads/footer",
      fileName
    );

    await writeFile(uploadPath, buffer);

    const data = {
      aboutUs: formData.get("aboutUs"),
      contactInfo: {
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
      },
      featuredLinks,
      socialMediaLinks: JSON.parse(formData.get("socialMediaLinks") as string),
      img: `/uploads/footer/${fileName}`,
    };

    await footerModel.create(data);

    return NextResponse.json(
      { message: "Footer created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
