import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

import db from "@/config/db";
import userModel from "@/models/user";
import { NextResponse } from "next/server";

const hashPassword = async (password) => {
  const hashP = await hash(password, 12);
  return hashP;
};

const verifyPassword = async (password, hashPass) => {
  const isValid = await compare(password, hashPass);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET, { expiresIn: "60s" });
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

const generateRefreshToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "15d",
  });
  return token;
};

const authUser = async () => {
  try {
    await db();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refresh-token")?.value;

    if (!token && !refreshToken) return null;

    let tokenPayload;

    try {
      tokenPayload = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      // اگر توکن منقضی شده باشد، از refresh-token استفاده می‌کنیم
      if (error.name === "TokenExpiredError" && refreshToken) {
        try {
          const refreshPayload = verify(
            refreshToken,
            process.env.JWT_SECRET_REFRESH
          );
          const user = await userModel.findOne({ email: refreshPayload.email });
          if (!user) return null;

          const newAccessToken = generateAccessToken({
            email: user.email,
            role: user.role,
          });

          const res = NextResponse.next();
          res.cookies.set("token", newAccessToken, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "strict",
          });
          return user;
        } catch (refreshErr) {
          return null;
        }
      }

      return null;
    }

    if (!tokenPayload?.email) return null;

    const user = await userModel.findOne(
      { email: tokenPayload.email },
      { password: 0, refreshToken: 0 }
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
