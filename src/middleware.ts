import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 🔒 محافظت از صفحات /my-account
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refresh-token")?.value;

    // 1️⃣ اگر هیچ تیکتی نداری
    if (!token && !refreshToken) {
      return NextResponse.redirect(new URL("/login-reg", request.url));
    }

    // 2️⃣ اگر accessToken داری
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        // بررسی نقش برای صفحات ادمین
        if (pathname.startsWith("/my-account/admin")) {
          if (payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url));
          }
        }

        return NextResponse.next(); // ✅ بیا تو
      } catch (error) {
        // accessToken منقضی شده
        if (refreshToken) {
          // اگر refreshToken داری، بذار client refresh کنه
          return NextResponse.next();
        }
        // هیچی نداری، برو login
        return NextResponse.redirect(new URL("/login-reg", request.url));
      }
    }

    // 3️⃣ فقط refreshToken داری
    if (refreshToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_REFRESH);
        await jwtVerify(refreshToken, secret);
        return NextResponse.next(); // ✅ بیا تو، client بعداً refresh می‌کنه
      } catch (error) {
        return NextResponse.redirect(new URL("/login-reg", request.url));
      }
    }
  }

  // 🚫 جلوگیری از رفتن به login وقتی لاگین هستی
  if (pathname === "/login-reg") {
    const token = request.cookies.get("token")?.value;
    if (token) {
      try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        // token منقضی، بذار به login بره
      }
    }
  }

  return NextResponse.next();
}

// function jwtVerify(token: any, secret: Uint8Array<ArrayBuffer>): { payload: any; } | PromiseLike<{ payload: any; }> {
//   throw new Error("Function not implemented.");
// }
