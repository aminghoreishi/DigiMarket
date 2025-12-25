"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

function MenuMobile({
  isLoggedIn,
  isAdmin,
  session,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
  session: any;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const signOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
      router.refresh();
    }
  };

  const searchFunc = () => {
    if (value.trim()) {
      router.push(`/search?query=${encodeURIComponent(value.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative font-danaMed">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="منوی موبایل"
      >
        {isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60  z-40 transition-opacity duration-300"
        />
      )}

      <div
        className={`fixed top-0 bottom-0 right-0 w-60 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-5" : "translate-x-[120%]"
        }`}
      >
        <div className="pr-7 pl-3 pt-5">
          <div className="relative">
            <input
              className="w-full border border-gray-300 rounded-md text-xs px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="جستجو..."
            />

            <button
              onClick={searchFunc}
              className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <ul className="mt-5 text-sm flex flex-col gap-5">
            <Link href="/">
              <li>صحفه اصلی</li>
            </Link>
            <Link href="/cart">
              <li>سبد خرید</li>
            </Link>
            {isLoggedIn ||
              (session.role === "USER" || (
                <Link href="/my-panel">
                  <li>پنل کاربری</li>
                </Link>
              ))}
            {isAdmin && isLoggedIn && (
              <Link href="/admin">
                <li>پنل ادمین</li>
              </Link>
            )}
          </ul>

          {isLoggedIn && (
            <div
              onClick={signOut}
              className="mt-5 text-sm border-t-2 pt-3 border-zinc-200"
            >
              <button>خروج از حساب کاربری</button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="mt-5 text-sm border-t-2 pt-3 border-zinc-200">
              <Link href="/login">
                <button>ورود به حساب کاربری</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
