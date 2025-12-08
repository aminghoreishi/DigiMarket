import { toEnglish } from "@/utils/color";
import React, { memo } from "react";

const CartColor: React.FC = ({
  colors,
  setColor,
  colorv,
}: {
  colors: string[];
  setColor: (color: string) => void;
  colorv: string;
}) => {
  return (
    <div>
      <h2 className="font-danaMed">رنگ:</h2>

      <div className="flex items-center mt-2 gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`border-2 ${color == colorv ? "outline-2  outline-sky-500" : "outline-0"} flex  items-center p-2 font-danaMed text-xs gap-x-1 cursor-pointer rounded-xl border-zinc-200 `}
            onClick={() => {
              setColor(color);
            }}
          >
            <div
              className={`size-4 ${color === "مشکی" ? "bg-black" : `bg-${toEnglish(color)}-500`} rounded-full`}
            ></div>
            <p>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CartColor.displayName = "CartColor";

export default CartColor;
