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

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;

    const skip = (Number(page) - 1) * 7;

    const offs = await offsModel.find({}).skip(skip).limit(7);

    const totalOffs = await offsModel.countDocuments({});
    const totalPages = Math.ceil(totalOffs / 7);

    return NextResponse.json({ offs, totalPages });
  } catch (error) {}
}
