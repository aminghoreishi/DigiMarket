import db from "@/config/db";
import userModel from "@/models/user";
import { generateAccessToken, verifyRefreshToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    await db();
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refresh-token")?.value;

    if (!refreshToken) return NextResponse.json({ message: "NO REFRESH TOKEN" }, { status: 401 });

    const user = await userModel.findOne({ refreshToken });
    if (!user) return NextResponse.json({ message: "INVALID REFRESH TOKEN" }, { status: 401 });

    // اعتبارسنجی refresh token
    verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({ email: user.email, role: user.role });

    const res = NextResponse.json({ message: "ACCESS TOKEN REFRESHED" }, { status: 200 });
    res.cookies.set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 5, // 5 دقیقه
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
