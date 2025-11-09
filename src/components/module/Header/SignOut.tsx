"use client";

import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const signOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={signOut}
      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
    >
      <CiLogin className="text-lg" />
      <p className="text-sm">خروج از حساب کاربری</p>
    </button>
  );
}
