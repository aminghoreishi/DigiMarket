"use client";
import { useEffect, useState } from "react";
import CartContainer from "../cartContainer/CartContainer";
import CartSummary from "../CartSummary/CartSummary";
import { CartItem } from "@/types/cart";

interface MainCartProps {
  isUserLoggedIn: boolean;
  setStep: React.Dispatch<React.SetStateAction<"cart" | "checkout">>;
  setAllPrice: React.Dispatch<React.SetStateAction<number>>;
  authUserId: string;
}

export default function MainCart({
  isUserLoggedIn,
  setStep,
  setAllPrice,
  authUserId,
}: MainCartProps) {
  const [carts, setCarts] = useState<CartItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("product");
    if (data) {
      setCarts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const total = carts.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setAllPrice(total);
  }, [carts, setAllPrice]);

  const updateCount = (id: number, newCount: number) => {
    setCarts((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      );
      localStorage.setItem("product", JSON.stringify(updated));
      return updated;
    });
  };

  const total = carts.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="grid max-lg:grid-cols-1 lg:grid-cols-12 gap-6 font-danaMed">
      {carts.length === 0 && (
        <p className="col-span-12 text-center">
          سبد خرید شما خالی است
        </p>
      )}

      {carts.length > 0 && (
        <>
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <CartContainer
              carts={carts}
              onUpdateCount={updateCount}
              setCarts={setCarts}
            />
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="mt-8 sticky top-20">
              <CartSummary
                total={total}
                isUserLoggedIn={isUserLoggedIn}
                authUserId={authUserId}
                setStep={setStep}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
