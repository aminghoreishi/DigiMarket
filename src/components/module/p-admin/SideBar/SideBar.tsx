import Image from "next/image";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { SlBasket } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
function SideBar() {
  return (
    <div className="fixed top-0 right-0 bottom-0 w-[255px] pt-5  ">
      <div className="flex justify-center w-full">
        <Image
          src="/image/logo (1).png"
          alt="sidebar-bg"
          width={150}
          height={150}
        />
      </div>

      <ul className="mt-8 px-8 flex flex-col gap-8 font-danaMed">
        <Link href="/admin">
          <li className="flex items-center text-sm gap-1 cursor-pointer">
            <HiOutlineHome size={19} />
            <p>پنل کاربری</p>
          </li>
        </Link>
        <Link href="/admin/products">
          <li className="flex items-center text-sm gap-1 cursor-pointer">
            <SlBasket size={19} />
            <p>محصولات</p>
          </li>
        </Link>
        <Link href="/admin/users">
          <li className="flex items-center text-sm gap-1 cursor-pointer">
            <FiUser size={19} />
            <p>کاربران</p>
          </li>
        </Link>
        <li className="flex text-red-500 items-center text-sm gap-1 cursor-pointer">
          <CiLogout size={19} />
          <p>خروج</p>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
