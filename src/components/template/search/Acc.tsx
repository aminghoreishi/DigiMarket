"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import PriceRangeFilter from "./Price";
import { useState } from "react";
import LaptopFilter from "./LaptopFilter";
import ModemFilter from "./ModemFilter";
function Acc({ subCategory }: { subCategory: any[] }) {
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenFeature, setIsOpenFeature] = useState(false);
  const [filter, setFilter] = useState("");

  const findSub = subCategory.map((item) => item.title);

  return (
    <div id="accordion-card" className="text-sm" data-accordion="collapse">
      <h2
        id="accordion-card-heading-1"
        className=""
        onClick={() => setIsOpenFeature(!isOpenFeature)}
      >
        <button
          type="button"
          className={`flex items-center ${isOpenFeature ? "rounded-b-none!" : "rounded-b-xl!"} border-zinc-200 rounded-xl justify-between w-full p-5 font-medium rtl:text-right text-body rounded-base shadow-xs border border-default hover:text-heading hover:bg-neutral-secondary-medium gap-3 aria-expanded:rounded-b-none aria-expanded:shadow-none`}
          data-accordion-target="#accordion-card-body-1"
          aria-expanded="true"
          aria-controls="accordion-card-body-1"
        >
          <span> ویژگی‌ها</span>
          <MdKeyboardArrowDown
            size={20}
            className={`${isOpenFeature ? "rotate-180" : ""} transition-transform`}
          />
        </button>
      </h2>
      <div
        id="accordion-card-body-1"
        className={` border ${isOpenFeature ? "" : "hidden"}  rounded-b-xl border-zinc-200 border-t-0 border-default rounded-b-base shadow-xs`}
        aria-labelledby="accordion-card-heading-1"
      >
        <div className="p-4 md:p-5">
          {findSub.includes("لب تاپ") && <LaptopFilter />}
          {findSub.includes("مودم") && <ModemFilter />}
        </div>
      </div>

      <h2
        id="accordion-card-heading-1"
        className="mt-5"
        onClick={() => setIsOpenPrice(!isOpenPrice)}
      >
        <button
          type="button"
          className={`flex items-center border-zinc-200 ${isOpenPrice ? "rounded-b-none!" : "rounded-b-xl!"}   rounded-xl justify-between w-full p-5 font-medium rtl:text-right text-body rounded-base shadow-xs border border-default hover:text-heading hover:bg-neutral-secondary-medium gap-3`}
          data-accordion-target="#accordion-card-body-1"
          aria-expanded="true"
          aria-controls="accordion-card-body-1"
        >
          <span>قیمت</span>
          <MdKeyboardArrowDown
            size={20}
            className={`${isOpenPrice ? "rotate-180" : ""} transition-transform`}
          />
        </button>
      </h2>
      <div
        id="accordion-card-body-1"
        className={` border  rounded-b-xl border-zinc-200 border-t-0 border-default rounded-b-base shadow-xs ${isOpenPrice ? "" : "hidden"}`}
        aria-labelledby="accordion-card-heading-1"
      >
        <div className="p-4 md:p-5">
          <PriceRangeFilter />
        </div>
      </div>
    </div>
  );
}

export default Acc;
