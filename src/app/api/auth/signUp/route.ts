import db from "@/config/db";
import userModel from "@/models/user";
import {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

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

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return NextResponse.json(
        { message: "ایمیل قبلا ثبت نام شده است" },
        { status: 422 }
      );
    }

    const hPassword = await hashPassword(password);
    const role = (await userModel.countDocuments({})) === 0 ? "ADMIN" : "USER";

    const accessToken = generateAccessToken({
      email,
      role,
    });
    const refreshToken = generateRefreshToken({
      email,
      role,
    });

    await userModel.create({
      fullName,
      email,
      password: hPassword,
      role,
      refreshToken,
    });
    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly`
    );

    return NextResponse.json(
      { message: "ثبت‌نام با موفقیت انجام شد" },
      {
        status: 201,
        headers,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
