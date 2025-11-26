import db from "@/config/db";
import productModel from "@/models/product";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(
  request: Request,
) {
  try {
    await db();

    const { searchParams } = new URL(request.url);
    const page = JSON.parse(searchParams.get("page") || "1");

    const skip = (Number(page) - 1) * 4;

    const products = await productModel.find({}).limit(4).skip(skip).lean();

    const totalProducts = await productModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / 4);

    return NextResponse.json(
      { data: products, totalPages },
      {
        status: 200,
      }
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
