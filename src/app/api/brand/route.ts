import db from "@/config/db";
import brandModel from "@/models/brand";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await db();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const img = formData.get("img") as File;

    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName = Date.now() + img.name;

    await writeFile(
      path.join(process.cwd(), "public/uploads/brand/" + fileName),
      buffer
    );

    await brandModel.create({
      title,
      img: `/uploads/brand/${fileName}`,
    });

    return NextResponse.json(
      { message: "Create Successfully" },
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

    const brands = await brandModel.find().sort({ createdAt: -1 });

    return NextResponse.json({ brands }, { status: 200 });
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
