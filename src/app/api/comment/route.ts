import db from "@/config/db";
import commentModel from "@/models/comment";
import { authAdmin } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { body, isOk, product } = await req.json();

    await commentModel.create({
      body,
      isOk,
      product,
    });

    return new Response(
      JSON.stringify({ message: "دیدگاه شما با موفقیت ثبت شد" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(JSON.stringify({ message: "خطا در ثبت دیدگاه" }), {
      status: 500,
    });
  }
}

export async function GET() {
  const isAdmin = await authAdmin();
  
  if (!isAdmin) {
    return new Response(JSON.stringify({ message: "Unauthorized access" }), {
      status: 401,
    });
  }

  try {
    await db();

    const comments = await commentModel.find({}).populate("product").lean();

    return new Response(JSON.stringify({ data: comments }), { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response(
      JSON.stringify({ message: "خطا در دریافت دیدگاه‌ها" }),
      { status: 500 }
    );
  }
}
