"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/reg"); // refresh یا expire fail
        }
      } catch (err) {
        console.error(err);
        router.push("/reg");
      }
    };

    // هر 2 دقیقه یکبار یا کمتر از expire
    const interval = setInterval(() => {
      if (pathname.startsWith("/my-account")) {
        refreshToken();
      }
    }, 120000); // 2 دقیقه (برای توکن 5 دقیقه‌ای امنه)

    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
