"use client";
import { toEnglish } from "@/utils/color";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
export default function CartCom({
  cart,
  onUpdateCount,
  setCarts,
}: {
  cart: any;
  onUpdateCount: (id: number, count: number) => void;
  setCarts: (carts: any[]) => void;
}) {
  const [count, setCount] = useState(cart.count);

  const plus = () => {
    if (count >= cart.mainCount) return;
    const newCount = count + 1;
    setCount(newCount);
    onUpdateCount(cart.id, newCount);
  };

  const minus = () => {
    if (count <= 1) return;
    const newCount = count - 1;
    setCount(newCount);
    onUpdateCount(cart.id, newCount);
  };

  const totalPrice = count * cart.price;

  const removeProduct = (id: number) => {
    const data = localStorage.getItem("product");
    if (data) {
      const products = JSON.parse(data);
      const filtered = products.filter((item: any) => item.id !== id);
      localStorage.setItem("product", JSON.stringify(filtered));
      setCarts(filtered);
    }
  };

  return (
    <div className="flex p-4 relative overflow-hidden group max-sm:gap-3 gap-5 items-center">
      <Link href={`/singleProduct/${cart.id}`}>
        <Image
          src={cart.img}
          alt=""
          width={120}
          height={120}
          className="rounded-lg"
        />
      </Link>

      <div className="flex-1">
        <div className="flex justify-between max-sm:gap-5 items-center mb-3">
          <h3 className="text-xs max-sm:line-clamp-2 max-lg:line-clamp-3 lg:text-sm">
            {cart.name}
          </h3>

          <div className="flex items-center max-sm:gap-2 gap-4 border-2 border-gray-200 rounded-lg max-sm:px-1 px-3 py-1">
            <FaPlus
              onClick={plus}
              className="text-green-600 max-sm:size-3 cursor-pointer"
            />
            <span className=" max-sm:text-xs text-center ss02">{count}</span>
            <AiOutlineMinus
              onClick={minus}
              className="text-red-600 max-sm:size-3 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div
            className={`bg-${toEnglish(cart.color)}-500 w-4 h-4 rounded-full`}
          />

          <p className="text-xl max-sm:text-sm   font-bold">
            {totalPrice.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>

      <div className="absolute transition-all group-hover:opacity-100 opacity-0 top-0 right-0">
        <button
          onClick={() => removeProduct(cart.id)}
          className="bg-red-500 text-white cursor-pointer rounded-lg px-4 py-1 text-xs"
        >
          <FaRegTrashCan className="size-5 " />
        </button>
      </div>
    </div>
  );
}
