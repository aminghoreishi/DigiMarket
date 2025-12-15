import db from "@/config/db";
import offsModel from "@/models/offs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { code, max, discount, product } = await req.json();

    await offsModel.create({
      code,
      max,
      discount,
      product,
    });

    return NextResponse.json(
      { message: "تخفیف با موفقیت ایجاد شد" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "خطا در ایجاد تخفیف",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  // Your GET method implementation
}
