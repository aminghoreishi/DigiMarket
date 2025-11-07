import db from "@/config/db";
import userModel from "@/models/user";
import { hashPassword, generateAccessToken, generateRefreshToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();
    const { fullName, email, password } = await req.json();

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return NextResponse.json({ message: "ایمیل قبلا ثبت نام شده است" }, { status: 422 });
    }

    const hPassword = await hashPassword(password);

    const role = (await userModel.countDocuments({})) === 0 ? "ADMIN" : "USER";

    const accessToken = generateAccessToken({ email, role });
    const refreshToken = generateRefreshToken({ email, role });

    await userModel.create({ fullName, email, password: hPassword, role, refreshToken });

    const res = NextResponse.json({ message: "ثبت‌نام با موفقیت انجام شد" }, { status: 201 });
    res.cookies.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 5, // 5 دقیقه
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 15, // 15 روز
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
