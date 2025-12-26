"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { SlBasket } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { BsAmazon } from "react-icons/bs";
import { IoMdDocument } from "react-icons/io";
import { useState } from "react";
function SideBar() {
  const route = usePathname();
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div dir="rtl" className="h-full overflow-y-auto z-50 bg-white pt-5 px-4">
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
        <Link href="/admin/offs">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/offs"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <RiDiscountPercentLine size={20} />
            <span>تخفیفات</span>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/orders"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <FaCheck size={20} />
            <span>سفارشات</span>
          </li>
        </Link>
        <Link href="/admin/footer">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/footer"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <IoMdDocument size={20} />
            <span>فوتر</span>
          </li>
        </Link>
        <Link href="/admin/brand">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/brand"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <BsAmazon size={20} />
            <span>برند ها</span>
          </li>
        </Link>
        <li
          className={`text-sm transition-colors ${
            route.startsWith("/admin/categories")
              ? "text-blue-500"
              : "text-gray-700"
          }`}
        >
          <div
            onClick={() => setOpenCategory((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
          >
            <BiCategory size={20} />

            <div className="flex items-center justify-between w-full">
              <Link
                href="/admin/categories"
                onClick={(e) => e.stopPropagation()}
              >
                <span>دسته بندی ها</span>
              </Link>

              <MdKeyboardArrowDown
                size={20}
                className={`transition-transform ${
                  openCategory ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {openCategory && (
            <ul className="mt-6 mr-6 flex flex-col gap-3 text-sm text-gray-600">
              <Link href="/admin/categories/subCategories">
                <li
                  className={`cursor-pointer hover:text-blue-500 ${
                    route === "/admin/categories/subCategories"
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  زیر دسته بندی ها
                </li>
              </Link>
            </ul>
          )}
        </li>

        <Link href="/admin/comment">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/comment"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <FaRegComments size={20} />
            <span>کامنت ها</span>
          </li>
        </Link>

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
