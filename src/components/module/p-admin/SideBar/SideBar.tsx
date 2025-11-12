"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { SlBasket } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";

function SideBar() {
  const route = usePathname();

  console.log(route);

  return (
    <div dir="rtl" className="h-full overflow-y-auto bg-white pt-5 px-4">
      <div className="flex justify-center w-full mb-8">
        <Image
          src="/image/logo (1).png"
          alt="logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      <ul className="px-4 flex flex-col gap-8 font-danaMed">
        <Link href="/admin">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <HiOutlineHome size={20} />
            <span>پنل کاربری</span>
          </li>
        </Link>

        <Link href="/admin/products">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/products" ||
              route === "/admin/products/createProduct"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <SlBasket size={20} />
            <span>محصولات</span>
          </li>
        </Link>

        <Link href="/admin/users">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/users" 
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <FiUser size={20} />
            <span>کاربران</span>
          </li>
        </Link>
        <li
          className={`flex items-center  relative group text-sm gap-2 cursor-pointer transition-colors ${
            route === "/admin/categories" || route === "/admin/categories/subCategories"
              ? "text-blue-500"
              : "text-gray-700 hover:text-blue-500"
          }`}
        >
          <SlBasket size={20} />
          <Link href="/admin/categories" className="w-full">
            <div className="flex items-center w-full justify-between">
              <span>دسته بندی ها</span>
              <p>
                <MdKeyboardArrowDown
                  size={20}
                  className="transition-all group-hover:rotate-180"
                />
              </p>
            </div>
          </Link>

          <div className="absolute top-[170%] p-4 rounded-xl w-full bg-white right-0 shadow-2xl transition-all opacity-0 group-hover:opacity-100 duration-250 invisible group-hover:visible">
            <ul>
              <Link href="/admin/categories/subCategories">
                <li className="">زیر دسته بندی ها</li>
              </Link>
            </ul>
          </div>
        </li>

        <li className=" text-sm">
          <Link href="/">بازگشت به صحفه اصلی</Link>
        </li>

        <li className="flex items-center text-sm gap-2 cursor-pointer text-red-500 hover:text-red-600 transition-colors mt-12">
          <CiLogout size={20} />
          <span>خروج</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
