"use client";

import {
  memo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

type ModelOffProps = {
  updateCartQuantity: (newCount?: number) => void;
  isLoggedIn: boolean;
  userID: string;
  id: string;
  setPriceState: Dispatch<SetStateAction<number>>;
  setIsOpenModalOff: (value: boolean) => void;
};

const ModelOff = memo(
  ({
    updateCartQuantity,
    isLoggedIn,
    userID,
    id,
    setPriceState,
    setIsOpenModalOff,
  }: ModelOffProps) => {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);

    const applyCode = async () => {
      if (!isLoggedIn) {
        toast.error("برای استفاده از کد تخفیف ابتدا وارد شوید");
        return;
      }

      if (!code.trim()) {
        toast.error("لطفا کد تخفیف را وارد کنید");
        return;
      }

      try {
        setIsLoading(true);

        const res = await fetch("/api/offs/use", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, id, userID }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "خطا در اعمال کد تخفیف");
          return;
        }

        updateCartQuantity(1);
        setIsOpenModalOff(false);

        const discount = data.discount;
        toast.success("کد تخفیف با موفقیت اعمال شد");

        const saved = localStorage.getItem("product");
        const cart = saved ? JSON.parse(saved) : [];

        const newCart = cart.map((p: any) =>
          String(p.id) === String(id)
            ? { ...p, price: p.price - (p.price * discount) / 100 }
            : p
        );

        localStorage.setItem("product", JSON.stringify(newCart));

        const current = newCart.find((p: any) => String(p.id) === String(id));
        if (current) setPriceState(current.price);
      } finally {
        setIsLoading(false);
      }
    };

    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
          onClick={() => setIsOpenModalOff(false)}
          className="absolute inset-0 bg-black/60"
        />

        <div className="relative bg-white rounded-xl p-5 max-w-md w-full shadow-lg">
          <h2 className="font-danaMed text-lg mb-4">
            آیا کد تخفیف دارید؟
          </h2>

          <input
            autoFocus
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="کد تخفیف را وارد کنید"
            className="outline-0 border border-gray-300 rounded-md p-2 w-full mb-6"
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={applyCode}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-danaMed text-sm"
            >
              {isLoading ? <BeatLoader size={6} color="white" /> : "دارم"}
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
      </div>,
      document.body
    );
  }
);

ModelOff.displayName = "ModelOff";
export default ModelOff;
