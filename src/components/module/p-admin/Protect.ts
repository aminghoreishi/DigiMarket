"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Protect() {
  const pathname = usePathname();
  const router = useRouter();

  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refresh-token");

  useEffect(() => {
    console.log(token, refreshToken);
  }, [pathname, router]);

  return null;
}
