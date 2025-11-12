import db from "@/config/db";
import commentModel from "@/models/comment";
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
    return new Response(
      JSON.stringify({ message: "خطا در ثبت دیدگاه" }),
      { status: 500 }
    );
  }
}
