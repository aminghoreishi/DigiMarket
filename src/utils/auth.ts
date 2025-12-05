// src/utils/auth.ts
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/config/db";
import userModel from "@/models/user";

export const hashPassword = async (password: string) => await hash(password, 12);
export const verifyPassword = async (password: string, hash: string) => await compare(password, hash);

export const generateAccessToken = (data: { email: string; role: string }) =>
  sign(data, process.env.JWT_SECRET!, { expiresIn: "60s" });

export const generateRefreshToken = (data: { email: string }) =>
  sign(data, process.env.JWT_SECRET_REFRESH!, { expiresIn: "15d" });


const verifyAccessToken = (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET!) as { email: string; role: string };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") throw error;
    return null;
  }
};


const refreshToken = async () => {
  const refreshTokenValue = cookies().get("refresh-token")?.value;
  if (!refreshTokenValue) throw new Error("No refresh token");

  const payload = verify(refreshTokenValue, process.env.JWT_SECRET_REFRESH!) as { email: string };
  await db();
  const user = await userModel.findOne({ email: payload.email });

  if (!user || user.refreshToken !== refreshTokenValue) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({ email: user.email, role: user.role });

  const response = NextResponse.next();
  response.cookies.set("token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60,
  });

  return { newAccessToken, response, user };
};


export const authUser = async () => {
  try {
    await db();
    const token = cookies().get("token")?.value;

    if (!token) return { user: null, response: null };

    let payload;
    try {
      payload = verifyAccessToken(token);
      if (!payload) throw new Error("Invalid token");
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        const { newAccessToken, response, user } = await refreshToken();
        payload = verifyAccessToken(newAccessToken);
        return { user: JSON.parse(JSON.stringify(user)), response };
      }
      return { user: null, response: null };
    }

    const user = await userModel.findOne(
      { email: payload.email },
      { password: 0, refreshToken: 0 }
    );

    return { user: user ? JSON.parse(JSON.stringify(user)) : null, response: null };
  } catch (error) {
    console.error("Auth error:", error);
    return { user: null, response: null };
  }
};

export const authAdmin = async () => {
  const { user } = await authUser();
  return user?.role === "ADMIN" ? user : null;
};