import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const productsLocalStorage = await req.json();

    const findProduct = await productModel.find({
      _id: productsLocalStorage.map((p) => p),
    });

    return NextResponse.json({ findProduct });
  } catch (error) {}
}
