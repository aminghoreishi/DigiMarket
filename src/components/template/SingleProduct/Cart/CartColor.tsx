import { toEnglish } from "@/utils/color";
import React, { memo } from "react";

type CartColorProps = {
  colors: string[];
  setColor: (color: string) => void;
  colorv: string;
};

const CartColor: React.FC<CartColorProps> = ({ colors, setColor, colorv }) => {
  return (
    <div>
      <h2 className="font-danaMed">رنگ:</h2>

      <div className="flex items-center mt-2 gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`border-2 ${
              color.trim() === colorv.trim()
                ? "outline-2 outline-sky-500"
                : "outline-0"
            } flex items-center p-2 font-danaMed text-xs gap-x-1 cursor-pointer rounded-xl border-zinc-200`}
            onClick={() => setColor(color.trim())}
          >
            <div
              style={{ backgroundColor: toEnglish(color) }}
              className={`
                size-4 rounded-full
                shadow-sm
              `}
            />
            <p>{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CartColor.displayName = "CartColor";
export default CartColor;
