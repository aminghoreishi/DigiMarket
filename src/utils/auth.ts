import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

import db from "@/config/db";
import userModel from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";

const hashPassword = async (password: string) => {
  const hashP = await hash(password, 12);
  return hashP;
};

const verifyPassword = async (password: string, hashPass: string) => {
  const isValid = await compare(password, hashPass);
  return isValid;
};

interface AccessTokenPayload {
  email: string;
  role: string;
}

const generateAccessToken = (data: AccessTokenPayload): string => {
  const token = sign(data, process.env.JWT_SECRET as string, {
    expiresIn: "60s",
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.JWT_SECRET);
    return tokenPayload;
  } catch (error) {
    console.log("Error ---> ", error);
  }
};

const generateRefreshToken = (data: string | object) => {
  const token = sign(data, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "15d",
  });
  return token;
};

interface AccessTokenPayload {
  email: string;
  role: string;
}

const authUser = async () => {
  try {
    await db();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const tokenPayload = verifyAccessToken(token);

    if (!tokenPayload?.email) return null;

    const user = await userModel.findOne(
      { email: tokenPayload.email },
      { password: 0, refreshToken: 0 } // عدم بازگشت فیلدهای حساس
    );

    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
};

const authAdmin = async () => {
  try {
    const user = await authUser();
    return user?.role === "ADMIN" ? user : null;
  } catch (error) {
    console.error("Auth admin error:", error);
    return null;
  }
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  authUser,
  authAdmin,
};
