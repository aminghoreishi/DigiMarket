"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // بررسی header برای token expired
    const checkTokenExpired = () => {
      const tokenExpired = document.querySelector(
        'meta[name="x-token-expired"]'
      )?.content;

      if (tokenExpired === "true") {
        refreshToken();
      }
    };

    const refreshToken = async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include", // 👈
        });

        if (!response.ok) {
          // refresh token هم منقضی شده، به صفحه لاگین برو
          router.push("/login-reg");
        } else {
          // token با موفقیت refresh شد
          router.refresh();
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        router.push("/login-reg");
      }
    };

    // هر 50 ثانیه یک بار token را refresh کن
    const interval = setInterval(async () => {
      if (pathname.startsWith("/my-account")) {
        await refreshToken();
      }
    }, 50000); // 50 seconds

    checkTokenExpired();

    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
