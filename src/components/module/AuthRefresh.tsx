"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
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
        });

        if (!response.ok) {
          router.push("/");
        } else {
          router.refresh();
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        router.push("/");
      }
    };

    const interval = setInterval(async () => {
      if (pathname.startsWith("/admin")) {
        await refreshToken();
      }
    }, 50000);

    checkTokenExpired();

    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
