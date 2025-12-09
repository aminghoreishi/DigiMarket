"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

function MenuMobile({
  isLoggedIn,
  isAdmin,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  console.log(isAdmin);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, router]);

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
        <div className="px-9 pt-5">
          <div className="flex justify-center">
            <Image
              width={80}
              height={80}
              alt="digi"
              src="/image/logo (1).png"
            />
          </div>

          <ul className="mt-5 text-sm flex flex-col gap-5">
            <Link href="/">
              <li>صحفه اصلی</li>
            </Link>
            <Link href="/cart">
              <li>سبد خرید</li>
            </Link>
            {isAdmin && isLoggedIn && (
              <Link href="/admin">
                <li>پنل ادمین</li>
              </Link>
            )}
          </ul>

          <div
            onClick={signOut}
            className="mt-5 text-sm border-t-2 pt-3 border-zinc-200"
          >
            <button>خروج از حساب کاربری</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
