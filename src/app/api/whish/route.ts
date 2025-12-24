import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const productsLocalStorage = await req.json();

    const { searchParams } = new URL(req.url);
    const page = JSON.parse(searchParams.get("page") || "1");
   

    const skip = (Number(page) - 1) * 3;

    const findProduct = await productModel
      .find({
        _id: productsLocalStorage.map((p) => p),
      })
      .skip(skip)
      .limit(3);



    return NextResponse.json({ findProduct });
  } catch (error) {}
}
