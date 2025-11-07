import db from "@/config/db";
import userModel from "@/models/user";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await hash(password, 12);
};

export const generateAccessToken = (data: object) => {
  return sign(data, process.env.JWT_SECRET!, { expiresIn: "5m" }); // 5 دقیقه
};

export const generateRefreshToken = (data: object) => {
  return sign(data, process.env.JWT_SECRET_REFRESH!, { expiresIn: "15d" }); // 15 روز
};

export const verifyAccessToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET_REFRESH!);
};

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

export { authUser, authAdmin };
