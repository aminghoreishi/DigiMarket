"use client";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
function Cart() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("product") || "[]");

    const lastThreeItems = cartData.slice(-3);
    setCarts(lastThreeItems);
  }, []);
  return (
    <div className="flex relative group items-center border-2 p-2 rounded-xl border-gray-300 gap-x-2 cursor-pointer">
      <RiShoppingCart2Fill className="" />

      <div className="absolute font-danaMed h-[300px] overflow-auto transition-all duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-white top-10  shadow-lg rounded-xl p-4 w-96 -right-[350px] border-2 border-gray-200 custom-scrollbar">
        <div className="text-sm border-b-2 border-zinc-200">
          <h2 className="ss02">{carts.length} کالا</h2>
        </div>

        <div>
          {carts.length === 0 ? (
            <p className="text-sm text-center py-4">سبد خرید شما خالی است</p>
          ) : (
            carts.map((cart) => (
              <div
                key={cart.id}
                className="flex items-center text-sm justify-between"
              >
                <div>
                  <Image
                    src={cart.img}
                    width={200}
                    height={200}
                    className="size-20"
                    alt={cart.name}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>{cart.title}</p>
                  <p>
                    {cart.price.toLocaleString()} <span>تومان</span>
                  </p>
                </div>
                <div className="flex items-center gap-5 border-2 border-zinc-200 rounded-xl p-2">
                  <div>
                    <AiOutlineMinus className="cursor-pointer text-red-500" />
                  </div>
                  <div className="ss02">{cart.count}</div>
                  <div>
                    <FaPlus className="cursor-pointer text-green-500" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sticky -bottom-5 bg-white p-4 border-t-2 border-zinc-200">
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            مشاهده سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
