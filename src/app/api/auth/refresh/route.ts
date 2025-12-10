import { NextRequest, NextResponse } from "next/server";
import { verify, sign } from "jsonwebtoken";
import db from "@/config/db";
import userModel from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await db();
    const refreshToken = req.cookies.get("refresh-token")?.value;
    const nextAuth = req.cookies.get("authjs.session-token")?.value;

    // if (nextAuth) {
    //   return NextResponse.json({ success: true });
    // }
    if (!refreshToken)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const payload = verify(refreshToken, process.env.JWT_SECRET_REFRESH!) as {
      email: string;
    };
    const user = await userModel.findOne({ email: payload.email });

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const newAccessToken = sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "60s" }
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
