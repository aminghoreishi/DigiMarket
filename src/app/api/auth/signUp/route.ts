import db from "@/config/db";
import userModel from "@/models/user";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth";
import { validateRegister } from "@/validator/registerValidator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const body = await req.json();

    const { password, email, fullName } = body;

    const validationResult = validateRegister(body);

    if (validationResult !== true) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.map((err: any) => ({
            field: err.field,
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return Response.json(
        { message: "ایمیل قبلا ثبت نام شده است" },
        { status: 422 }
      );
    }

    const hPassword = await hashPassword(password);

    const users = await userModel.find({});

    const role = users.length === 0 ? "ADMIN" : "USER";

    const accessToken = generateAccessToken({ email, role });
    const refreshToken = generateRefreshToken({ email, role });

    await userModel.create({
      fullName,

      email,
      password: hPassword,
      role,
      refreshToken,
    });

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true`
    );

    return Response.json(
      { message: "ثبت‌نام با موفقیت انجام شد" },
      {
        status: 201,
        headers,
      }
    );
  } catch (error) {}
}
