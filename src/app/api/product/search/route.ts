import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await db();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const findings = await productModel
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { longDescription: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10);

    return NextResponse.json(findings);
  } catch (error) {}
}
