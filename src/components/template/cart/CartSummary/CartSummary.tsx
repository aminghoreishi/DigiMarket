"use client";

import { useRouter } from "next/dist/client/components/navigation";
import toast from "react-hot-toast";

function CartSummary({
  total,
  isUserLoggedIn,
}: {
  total: number;
  isUserLoggedIn: any;
}) {
  const router = useRouter();

  const buyFunc = () => {
    if (!isUserLoggedIn) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    router.push("/checkout");
  };
  return (
    <div className="p-3 font-danaMed">
      <div className="flex text-orange-500 justify-between items-center">
        <p>جمع مبلغ نهایی</p>
        <p>{total.toLocaleString("fa-IR")}</p>
      </div>

      <div className="mt-5">
        <button
          onClick={buyFunc}
          className="bg-orange-500 w-full shadow-2xl cursor-pointer  text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          ادامه فرایند خرید
        </button>
      </div>
    </div>
  );
}
export default CartSummary;
