import db from "@/config/db";
import categoryModel from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();

    const { title, href } = body;

    await categoryModel.create({ title, href });

    return NextResponse.json({ message: "Created sussfualy" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
