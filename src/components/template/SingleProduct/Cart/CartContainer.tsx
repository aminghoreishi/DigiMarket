"use client";

import { useEffect, useState } from "react";
import CartAddCount from "./CartAddCount";
import toast from "react-hot-toast";
import Link from "next/link";
import ModelOff from "./ModelOff";

type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  img: string;
  color: string;
  mainCount: number;
};

type CartContainerProps = {
  count: number;
  name: string;
  id: string;
  userID: string;
  priceState: number;
  setPriceState: React.Dispatch<React.SetStateAction<number>>;
  img: string;
  isLoggedIn: boolean;
  color: string;
  mainCount: number;
};

function CartContainer({
  count,
  name,
  id,
  userID,
  priceState,
  setPriceState,
  img,
  isLoggedIn,
  color,
  mainCount,
}: CartContainerProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [countCart, setCountCart] = useState<number>(1);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [isOpenModalOff, setIsOpenModalOff] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("product");
    const savedCart: CartItem[] = saved ? JSON.parse(saved) : [];

    setCart(savedCart);

    const item = savedCart.find((p) => p.id === id);

    if (item) {
      setCountCart(item.count);
      setIsProductInCart(true);
      setPriceState(item.price);
    } else {
      setCountCart(1);
      setIsProductInCart(false);
    }
  }, [id, setPriceState]);

  const updateCartQuantity = (newCount?: number) => {
    const quantity = newCount ?? countCart;

    if (quantity > count) {
      toast.error("موجودی کافی نیست");
      setCountCart(count);
      return;
    }

    const newCart = [...cart];
    const existingIndex = newCart.findIndex((item) => item.id === id);

    if (existingIndex > -1) {
      if (quantity === 0) {
        newCart.splice(existingIndex, 1);
        setIsProductInCart(false);
        setCountCart(1);
        toast.success("محصول از سبد حذف شد");
      } else {
        newCart[existingIndex].count = quantity;
        toast.success("تعداد به‌روزرسانی شد");
      }
    } else if (quantity > 0) {
      newCart.push({
        id,
        name,
        price: priceState,
        count: quantity,
        img,
        color,
        mainCount,
      });
      setIsProductInCart(true);
      toast.success("محصول به سبد خرید اضافه شد");
    }

    setCart(newCart);
    localStorage.setItem("product", JSON.stringify(newCart));
    setCountCart(quantity);
  };

  const handleProductRemoved = () => {
    updateCartQuantity(0);
  };

  return (
    <>
      {isOpenModalOff && (
        <ModelOff
          setPriceState={setPriceState}
          id={id}
          setIsOpenModalOff={setIsOpenModalOff}
          userID={userID}
          isLoggedIn={isLoggedIn}
          updateCartQuantity={updateCartQuantity}
        />
      )}

      {count === 0 && (
        <div className="mt-4">
          <button
            disabled
            className="bg-gray-400 cursor-not-allowed text-white p-3 rounded-lg font-danaMed w-full text-sm"
          >
            ناموجود در انبار
          </button>
        </div>
      )}

      {count > 0 && (
        <>
          {isProductInCart ? (
            <>
              <CartAddCount
                countServer={count}
                countCart={countCart}
                updateCartQuantity={updateCartQuantity}
                handleProductRemoved={handleProductRemoved}
              />
              <div className="mt-4">
                <Link href="/cart">
                  <button className="bg-green-500 hover:bg-green-600 transition text-white p-3 rounded-lg font-danaMed w-full text-sm">
                    مشاهده سبد خرید
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <button
                onClick={() => setIsOpenModalOff(true)}
                className="bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-lg font-danaMed w-full text-sm"
              >
                افزودن به سبد خرید
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CartContainer;
