"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineMinus } from "react-icons/ai";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  img: string;
};

function Cart() {
  const [carts, setCarts] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("product") || "[]");
    const lastThreeItems = cartData.slice(-3);
    setCarts(lastThreeItems);
  }, []);

  return (
    <div className="flex relative group items-center border-2 p-2 rounded-xl border-gray-300 gap-x-2 cursor-pointer">
      <RiShoppingCart2Fill />

      <div className="absolute font-danaMed h-[300px] overflow-y-auto transition-all duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-white top-10 shadow-lg rounded-xl p-4 w-96 -right-[350px] border-2 border-gray-200 custom-scrollbar">
        <div className="text-sm border-b-2 border-zinc-200 pb-2 mb-3">
          <h2 className="ss02">{carts.length} کالا</h2>
        </div>

        <div className="pb-16">
          {carts.length === 0 ? (
            <p className="text-sm text-center py-8 text-gray-500">
              سبد خرید شما خالی است
            </p>
          ) : (
            carts.map((cart: CartItem) => (
              <div
                key={cart.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <Image
                    src={cart.img}
                    width={80}
                    height={80}
                    className="size-16 rounded-md object-cover"
                    alt={cart.name}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1 px-3">
                  <p className="text-xs line-clamp-1">{cart.name}</p>
                  <p className="text-xs font-medium">
                    {cart.price.toLocaleString("fa-IR")} <span>تومان</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 border border-zinc-200 rounded-lg p-1 text-xs">
                  <AiOutlineMinus className="cursor-pointer text-red-500 text-sm" />
                  <span className="ss02 w-6 text-center">{cart.count}</span>
                  <FaPlus className="cursor-pointer text-green-500 text-sm" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white p-3 border-t-2 border-zinc-200">
          <Link href="/cart">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-danaMed text-sm">
              مشاهده سبد خرید
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
