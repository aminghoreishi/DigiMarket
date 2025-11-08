// app/api/auth/set-cookies/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/config/db";
import userModel from "@/models/user";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider");
  const userId = searchParams.get("userId");

  if (!userId || provider !== "google") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  await db();
  const user = await userModel.findById(userId).select("-password");
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const accessToken = generateAccessToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id.toString(),
    email: user.email,
  });

  // ذخیره refreshToken در دیتابیس (اختیاری)
  // await userModel.findByIdAndUpdate(userId, { refreshToken });

  const response = NextResponse.redirect(new URL("/", req.url));

  response.cookies.set("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60,
  });

  response.cookies.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 24 * 60 * 60,
  });

  return response;
}