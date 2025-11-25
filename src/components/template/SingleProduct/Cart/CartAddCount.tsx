"use client";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
function CartAddCount({
  countServer,
  countCart,
  setCountCart,
  id,
  handleProductRemoved,
}: {
  countServer: number;
  countCart: number;
  setCountCart: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  handleProductRemoved: () => void;
}) {
  const deleteProduct = () => {
    const data = JSON.parse(localStorage.getItem("product") || "[]");

    if (data) {
      const filterData = data.filter((item) => item.id !== id);
      localStorage.setItem("product", JSON.stringify(filterData));
      handleProductRemoved();
    }
  };

  return (
    <div className="rounded-xl border-2 border-zinc-200 flex justify-between items-center px-3 py-2">
      <div onClick={() => setCountCart((prev) => prev + 1)}>
        <FiPlus className="cursor-pointer text-green-500" />
      </div>
      <div className="select-none font-danaMed ss02">
        {countCart}{" "}
        {countCart === countServer && (
          <span className="text-xs text-red-500 mx-2">حداکثر تعداد</span>
        )}
      </div>
      <div>
        {countCart === 1 ? (
          <FaRegTrashAlt
            className="cursor-pointer text-red-500"
            onClick={() => deleteProduct()}
          />
        ) : (
          <AiOutlineMinus
            className="cursor-pointer text-red-500"
            onClick={() =>
              setCountCart((prev) => {
                if (prev <= 1) {
                  return 1;
                }
                return prev - 1;
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default CartAddCount;
