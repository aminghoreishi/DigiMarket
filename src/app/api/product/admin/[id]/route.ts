import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  await db();

  const id = params.id;

  const findPro = await productModel
    .findOne({ subCategory: id })
    .select("name _id");

  return NextResponse.json([findPro]);
}
