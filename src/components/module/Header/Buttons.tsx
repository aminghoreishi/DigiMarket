import { FaRegUser } from "react-icons/fa6";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { BsBasket } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
function Buttons() {
  return (
    <div className="flex items-center font-danaMed gap-3">
      <div className="flex relative group items-center gap-x-2 border-2 p-2 rounded-xl border-gray-300 cursor-pointer">
        <p className="text-xs">حساب کاربری</p>
        <FaRegUser />

        <div className="absolute transition-all duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-white top-10  shadow-lg rounded-xl p-4 w-52 -right-24 border-2 border-gray-200">
          <ul className="text-sm flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <LuUser />
              <p>امیر رضا کریمی</p>
            </li>
            <li className="flex items-center gap-2">
              <BsBasket />
              <p>سفارش ها</p>
            </li>
             <li className="flex items-center gap-2 text-red-500">
              <CiLogin />
              <p>خروج از حساب کاربری</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center border-2 p-2 rounded-xl border-gray-300 gap-x-2 cursor-pointer">
        <RiShoppingCart2Fill />
      </div>
    </div>
  );
}

export default Buttons;
