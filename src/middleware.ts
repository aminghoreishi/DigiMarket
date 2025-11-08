import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refresh-token")?.value;

    if (!token && !refreshToken) {
      return NextResponse.redirect(new URL("/reg", request.url));
    }

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (pathname.startsWith("/admin")) {
          if (payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url));
          }
        }

        return NextResponse.next();
      } catch (error) {
        if (refreshToken) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/reg", request.url));
      }
    }

    if (refreshToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_REFRESH);
        await jwtVerify(refreshToken, secret);
        return NextResponse.next(); // ✅ بیا تو، client بعداً refresh می‌کنه
      } catch (error) {
        return NextResponse.redirect(new URL("/reg", request.url));
      }
    }
  }

  if (pathname === "/reg") {
    const token = request.cookies.get("token")?.value;
    if (token) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        
      }
    }
  }

  return NextResponse.next();
}
function jwtVerify(
  token: any,
  secret: Uint8Array<ArrayBuffer>
): { payload: any } | PromiseLike<{ payload: any }> {
  throw new Error("Function not implemented.");
}
