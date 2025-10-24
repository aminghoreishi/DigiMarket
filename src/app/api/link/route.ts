import db from "@/config/db";
import linkModel from "@/models/link";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();

    const { title, href, subLink } = body;

    await linkModel.create({ title, href, subLink });

    return NextResponse.json({ message: "Created successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message });
  }
}
