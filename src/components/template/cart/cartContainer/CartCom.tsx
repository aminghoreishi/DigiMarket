"use client";
import { toEnglish } from "@/utils/color";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
function CartCom({ cart }: { cart: any }) {
  const [counter, setCounter] = useState(cart.count);
  const addCounter = () => {
    if (counter >= cart.mainCount) return;
    setCounter(counter + 1);
  };
  const minusCounter = () => {
    if (counter <= 1) return;
    setCounter(counter - 1);
  };

  const totalPrice = useMemo(() => {
    return counter * cart.price;
  }, [counter, cart.price]);
  return (
    <div className="flex p-3 gap-5 items-center justify-baseline w-full font-danaMed">
      <div>
        <Image src={cart.img} alt={cart.name} width={200} height={200} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-10">
          <h2 className="text-xs line-clamp-1">{cart.name}</h2>
          <div className="flex ss02 items-center gap-5 border-2 border-zinc-200 rounded-lg px-3 py-2">
            <div onClick={addCounter}>
              <FaPlus className="cursor-pointer text-green-500 text-sm" />
            </div>
            <p>{counter}</p>
            <div onClick={minusCounter}>
              <AiOutlineMinus className="cursor-pointer text-red-500 text-sm" />
            </div>
          </div>
        </div>
        <div className="flex w-full  justify-between mt-3">
          <div>
            <div
              className={`bg-${toEnglish(cart.color)}-500 size-3 rounded-full `}
            ></div>
          </div>

          <div className="">
            <p className="text-2xl">
              {totalPrice.toLocaleString("fa-IR")}{" "}
              <span className="text-xs text-zinc-400">تومان</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCom;
