import db from "@/config/db";
import userModel from "@/models/user";
import { hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
const hashPassword = async (password) => {
  const hashP = await hash(password, 12);
  return hashP;
};

const generateAccessToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET, { expiresIn: "60s" });
  return token;
};

const generateRefreshToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "15d",
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

export { hashPassword, generateAccessToken, generateRefreshToken, authUser , authAdmin };
