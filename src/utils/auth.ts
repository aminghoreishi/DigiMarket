import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "@/config/db";
import userModel from "@/models/user";

export interface AccessTokenPayload {
  email: string;
  role: string;
}

export const hashPassword = async (password: string) => {
  return await hash(password, 12);
};

export const verifyPassword = async (password: string, hashPass: string) => {
  return await compare(password, hashPass);
};

export const generateAccessToken = (data: AccessTokenPayload): string => {
  return sign(data, process.env.JWT_SECRET!, { expiresIn: "60s" }); // 60 seconds
};

export const generateRefreshToken = (data: { email: string }): string => {
  return sign(data, process.env.JWT_SECRET_REFRESH!, { expiresIn: "15d" }); // 15 days
};

const attemptTokenRefresh = async () => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh-token=${refreshToken}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Refresh API failed:", res.status, err);
      throw new Error("Refresh failed");
    }

    const data = await res.json();
    const newAccessToken = data.accessToken;

    if (!newAccessToken) throw new Error("No access token in response");

    const payload = verify(newAccessToken, process.env.JWT_SECRET!) as AccessTokenPayload;

    return { payload, refreshed: true, newToken: newAccessToken };
  } catch (err: any) {
    console.error("Token refresh error:", err.message);
    throw new Error("Session expired. Please log in again.");
  }
};

export const verifyAccessToken = async (token?: string) => {
  if (!token) {
    throw new Error("No access token provided");
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET!) as AccessTokenPayload;
    return { payload, refreshed: false };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return await attemptTokenRefresh();
    }
    throw new Error("Invalid access token");
  }
};

export const authUser = async () => {
  try {
    await db();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const result = await verifyAccessToken(token);
    if (!result?.payload?.email) return null;

    const user = await userModel.findOne(
      { email: result.payload.email },
      { password: 0, refreshToken: 0 }
    );

    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error: any) {
    console.error("Auth error:", error.message);
    return null;
  }
};

export const authAdmin = async () => {
  const user = await authUser();
  return user?.role === "ADMIN" ? user : null;
};