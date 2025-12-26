import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { body, isOk, product, user } = await req.json();

    await commentModel.create({
      body,
      isOk,
      product,
      user,
    });

    return new Response(
      JSON.stringify({ message: "دیدگاه شما با موفقیت ثبت شد" }),
      { status: 201 }
    );
  } catch (error) {
   
    return new Response(JSON.stringify({ message: "خطا در ثبت دیدگاه" }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const page = JSON.parse(searchParams.get("page") || "1");

    const skip = (Number(page) - 1) * 7;

    const comments = await commentModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("product")
      .skip(skip)
      .limit(7)
      .lean();

    const totalComments = await commentModel.countDocuments({});
    const totalPages = Math.ceil(totalComments / 7);

    return NextResponse.json(
      { data: comments, totalPages },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      JSON.stringify({ message: "خطا در دریافت دیدگاه‌ها" }),
      { status: 500 }
    );
  }
}
