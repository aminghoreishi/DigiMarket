import db from "@/config/db";
import userModel from "@/models/user";

import { generateAccessToken } from "@/utils/auth";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    await db();

    const refreshToken = (await cookies()).get("refresh-token")?.value;

    if (!refreshToken) {
      return Response.json(
        { message: "NO HAVE REFRESHTOKEN" },
        { status: 401 }
      );
    }

    const user = await userModel.findOne({ refreshToken });

    if (!user) {
      return Response.json(
        { message: "NO HAVE REFRESHTOKEN" },
        { status: 401 }
      );
    }

    verify(refreshToken, process.env.JWT_SECRET_REFRESH);
    const newAccessToken = generateAccessToken({
      phone: user.phone,
      role: user.role,
    });

    return NextResponse.json(
      { message: "NEW ACCESSS TOKEN SAVED" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newAccessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}