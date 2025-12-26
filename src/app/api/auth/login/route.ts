// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/config/db";
import userModel from "@/models/user";
import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    await db();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "ایمیل و رمز عبور الزامی هستند" },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({ email: user.email });

    await userModel.updateOne({ _id: user._id }, { $set: { refreshToken } });

    const response = NextResponse.json(
      { success: true, message: "ورود با موفقیت انجام شد" },
      { status: 200 }
    );

    const isProd = process.env.NODE_ENV === "production";

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true`
    );

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });


  } catch (error: any) {
   
    return NextResponse.json(
      { success: false, message: "خطا در سرور" },
      { status: 500 }
    );
  }
}
