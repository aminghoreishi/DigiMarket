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

import { FaRegHeart } from "react-icons/fa";
function SideBarUserPanel() {
  const route = usePathname();
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
        <Link href="/my-panel">
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

        <Link href="/my-panel/whish">
          <li
            className={`flex items-center text-sm gap-2 cursor-pointer transition-colors ${
              route === "/admin/comment"
                ? "text-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <FaRegHeart size={20} />
            <span>علاقه مندی ها</span>
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

export default SideBarUserPanel;
