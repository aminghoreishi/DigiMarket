import React from "react";
import { GrBasket } from "react-icons/gr";
import { FaFingerprint } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
function TopSec({ step }: { step: string }) {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center">
        <div
          className={`flex items-center gap-3 text-lg font-semibold ${step === "cart" ? "text-orange-500" : "text-zinc-500"}`}
        >
          <GrBasket />
          <p>سبد خرید</p>
        </div>
        <div
          className={`flex  items-center gap-3 text-lg font-semibold ${step === "checkout" ? "text-orange-500" : "text-zinc-500"}`}
        >
          <FaFingerprint />
          <p>تکمیل سفارش </p>
        </div>
        <div className="flex items-center gap-3 text-lg font-semibold">
          <AiOutlineCheck />
          <p>پرداخت</p>
        </div>
      </div>
    </div>
  );
}

export default TopSec;
