import { FaPlus, FaRegUser } from "react-icons/fa6";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { BsBasket } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import Image from "next/image";
import { AiOutlineMinus } from "react-icons/ai";

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
      <div className="flex relative group items-center border-2 p-2 rounded-xl border-gray-300 gap-x-2 cursor-pointer">
        <RiShoppingCart2Fill className="" />

        <div className="absolute font-danaMed h-[300px] overflow-auto transition-all duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-white top-10  shadow-lg rounded-xl p-4 w-96 -right-[350px] border-2 border-gray-200 custom-scrollbar">
          <div className="text-sm border-b-2 border-zinc-200">
            <h2>2 کالا</h2>
          </div>

          <div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div>
          <Image
            src="/image/laptop.webp"
            width={200}
            height={200}
            className="size-20"
            alt="laptop"
          />
              </div>
              <div className="flex flex-col gap-2">
          <p>لپ تاپ لنوو</p>
          <p>
            13,000,000 <span>تومان</span>
          </p>
              </div>
              <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
          <div>
            <AiOutlineMinus className="cursor-pointer text-red-500" />
          </div>
          <div>1</div>
          <div>
            <FaPlus className="cursor-pointer text-green-500" />
          </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Buttons;
