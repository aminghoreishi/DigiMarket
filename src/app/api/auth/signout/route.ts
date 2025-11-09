import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("refresh-token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("next-auth.session-token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
