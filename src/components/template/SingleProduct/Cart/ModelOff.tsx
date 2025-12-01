"use client";
import { useState } from "react";
import toast from "react-hot-toast";

function ModelOff({
  updateCartQuantity,
  isLoggedIn,
  userID,
  id,
  setPriceState,
  setIsOpenModalOff,
}: {
  updateCartQuantity: (newCount?: number) => void;
  isLoggedIn: boolean;
  userID: string;
  setPriceState: Dispatch<SetStateAction<number>>;
  setIsOpenModalOff: (value: boolean) => void;
  id: string;
}) {
  const [code, setCode] = useState("");

  const applyCode = async () => {
    if (!isLoggedIn) {
      toast.error("برای استفاده از کد تخفیف ابتدا وارد شوید");
      return;
    }
    const res = await fetch("/api/offs/use", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, id, userID }),
    });

    const response = await res.json();

    if (res.status === 400) {
      toast.error(response.message || "خطا در اعمال کد تخفیف");
      return;
    }

    if (res.ok) {
      updateCartQuantity(1);
      setIsOpenModalOff(false);
      const discount = response.discount;
      toast.success("کد تخفیف با موفقیت اعمال شد");

      const saved = localStorage.getItem("product");
      const savedCart = saved ? JSON.parse(saved) : [];

      const findCart = savedCart.some(
        (p: any) => String(p.id).trim() === String(id).trim()
      );

      if (findCart) {
        const newCart = savedCart.map((p: any) =>
          p.id === id
            ? {
                ...p,
                price: p.price - (p.price * discount) / 100,
              }
            : p
        );

        localStorage.setItem("product", JSON.stringify(newCart));
        setPriceState(newCart.find((p: any) => p.id === id).price);
      }
    } else {
      toast.error(response.message || "خطا در اعمال کد تخفیف");
    }
  };
  return (
    <div className="min-h-screen fixed inset-0 flex items-center justify-center p-5 text-center">
      <div className="bg-black/60 fixed inset-0 z-auto"></div>
      <div className="bg-white rounded-xl z-40  p-5 max-w-md w-full shadow-lg">
        <h2 className="font-danaMed text-lg mb-4">ایا کد تخفیف دارید؟</h2>
        <p className="font-danaMed text-sm mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="کد تخفیف را وارد کنید"
            className="outline-0 border border-gray-300 rounded-md p-2 w-full"
          />
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={applyCode}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-danaMed text-sm"
          >
            اعمال
          </button>
          <button
            onClick={() => {
              updateCartQuantity(1);
              setIsOpenModalOff(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg font-danaMed text-sm"
          >
            ندارم
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelOff;
