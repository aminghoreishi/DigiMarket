import db from "@/config/db";
import userModel from "@/models/user";
import { generateAccessToken, generateRefreshToken, verifyPassword } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await db();
    const { email, password } = await request.json();

    const isUserExite = await userModel.find({ email, password });

    const verifyPass = verifyPassword(password, isUserExite.password);

    const accessToken = generateAccessToken({ email, role: isUserExite.role }); // 60s
    const refreshToken = generateRefreshToken({ email }); // 15d

      await userModel.updateOne(
      { _id: isUserExite._id },
      { $set: { refreshToken } }
    );

    const response = NextResponse.json(
      { message: "ورود با موفقیت انجام شد" },
      { status: 200 }
    );

     const isProd = process.env.NODE_ENV === "production";
    const domain = process.env.COOKIE_DOMAIN; 


    
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 60,
      domain,
    });

    // Refresh Token Cookie (15 days)
    response.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 24 * 60 * 60, // 15 days
      domain,
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
