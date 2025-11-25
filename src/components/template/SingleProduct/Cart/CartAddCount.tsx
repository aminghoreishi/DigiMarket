"use client";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

function CartAddCount({
  countServer,
  countCart,
  updateCartQuantity,
  handleProductRemoved,
}: {
  countServer: number;
  countCart: number;
  updateCartQuantity: (newCount?: number) => void;
  handleProductRemoved: () => void;
}) {
  return (
    <div className="rounded-xl border-2 border-zinc-200 flex justify-between items-center px-4 py-3">
      <div
        onClick={() => {
          if (countCart < countServer) {
            updateCartQuantity(countCart + 1);
          }
        }}
        className="cursor-pointer"
      >
        <FiPlus className="text-green-500 text-xl" />
      </div>

      <div className="font-danaMed text-lg  ss02">
        {countCart}
        {countCart >= countServer && (
          <span className="text-xs text-red-500 mr-2">حداکثر موجودی</span>
        )}
      </div>

      <div>
        {countCart <= 1 ? (
          <FaRegTrashAlt
            onClick={handleProductRemoved}
            className="cursor-pointer text-red-500 text-xl"
          />
        ) : (
          <AiOutlineMinus
            onClick={() => updateCartQuantity(countCart - 1)}
            className="cursor-pointer text-red-500 text-xl"
          />
        )}
      </div>
    </div>
  );
}

export default CartAddCount;
