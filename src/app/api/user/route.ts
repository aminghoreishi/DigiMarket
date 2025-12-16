import db from "@/config/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const getUser = await userModel.find({});

    return NextResponse.json(getUser, {
      status: 200,
    });
  } catch (error) {}
}
