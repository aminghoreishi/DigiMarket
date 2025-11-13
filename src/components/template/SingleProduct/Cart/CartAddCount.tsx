"use client";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";

function CartAddCount({
  countServer,
  countCart,
  setCountCart,
}: {
  countServer: number;
  countCart: number;
  setCountCart: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="rounded-xl border-2 border-zinc-200 flex justify-between items-center px-3 py-2">
      <div onClick={() => setCountCart((prev) => prev + 1)}>
        <FiPlus className="cursor-pointer text-green-500" />
      </div>
      <div className="select-none font-danaMed ss02">{countCart}</div>
      <div
        onClick={() =>
          setCountCart((prev) => {
            if (prev <= 1) {
              return 1;
            }
            return prev - 1;
          })
        }
      >
        <AiOutlineMinus className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
}

export default CartAddCount;
