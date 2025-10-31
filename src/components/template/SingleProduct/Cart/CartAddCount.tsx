import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
function CartAddCount() {
  return (
    <div className="rounded-xl border-2 border-zinc-200 flex justify-between items-center px-3 py-2">
      <div>
        <FiPlus className="cursor-pointer text-green-500" />
      </div>
      <div>1</div>
      <div>
        <AiOutlineMinus className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
}

export default CartAddCount;
