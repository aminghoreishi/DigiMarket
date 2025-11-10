import { NextRequest, NextResponse } from "next/server";
import db from "@/config/db";
import userModel from "@/models/user";
import {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "همه فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "ایمیل نامعتبر است" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "ایمیل قبلا ثبت نام شده است" },
        { status: 422 }
      );
    }

    // === Hash password ===
    const hashedPassword = await hashPassword(password);

    const userCount = await userModel.countDocuments({});
    const role = userCount === 0 ? "ADMIN" : "USER";

    const accessToken = generateAccessToken({ email, role }); // 60s
    const refreshToken = generateRefreshToken({ email }); // 15d

    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      refreshToken,
    });

    const response = NextResponse.json(
      { message: "ثبت‌نام با موفقیت انجام شد" },
      { status: 201 }
    );

    const isProd = process.env.NODE_ENV === "production";
    const domain = process.env.COOKIE_DOMAIN;

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
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "خطایی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
