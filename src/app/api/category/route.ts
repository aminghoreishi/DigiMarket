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
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
