"use client";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
function CartAddCount() {
  const [count, setCount] = useState(1);
  return (
    <div className="rounded-xl border-2 border-zinc-200 flex justify-between items-center px-3 py-2">
      <div onClick={() => setCount(count + 1)}>
        <FiPlus className="cursor-pointer text-green-500" />
      </div>
      <div>{count}</div>
      <div onClick={() => setCount(count - 1)}>
        <AiOutlineMinus className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
}

export default CartAddCount;
