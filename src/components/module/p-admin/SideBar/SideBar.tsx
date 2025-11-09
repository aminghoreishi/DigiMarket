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
        <Link href="/admin/categories">
          <li
            className={`flex items-center relative group text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/categories"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <SlBasket size={20} />
            <div className="flex items-center w-full justify-between">
              <span>دسته بندی ها</span>
              <p>
                <MdKeyboardArrowDown size={20} className="transition-all group-hover:rotate-180" />
              </p>
            </div>

            <div className="absolute top-full right-8 transition-all opacity-0 group-hover:opacity-100 duration-250 invisible group-hover:visible bg-white   mt-2 ">
              <ul>
                <li className=" p-2   mt-2 w-40 ">زیر دسته بندی ها</li>
              </ul>
            </div>
          </li>
        </Link>

        <li className="flex items-center text-sm gap-2 cursor-pointer text-red-500 hover:text-red-600 transition-colors mt-12">
          <CiLogout size={20} />
          <span>خروج</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
