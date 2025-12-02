"use client";
import { useEffect, useState } from "react";
import CartAddCount from "./CartAddCount";
import toast from "react-hot-toast";
import Link from "next/link";
import ModelOff from "./ModelOff";

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
}: {
  count: number;
  name: string;
  id: string;
  price: number;
  img: string;
  color: string;
  mainCount: number;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [countCart, setCountCart] = useState(1);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isOpenModalOff, setIsOpenModalOff] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("product");
    const savedCart = saved ? JSON.parse(saved) : [];
    setCart(savedCart);

    const item = savedCart.find((p: any) => p.id === id);
    if (item) {
      setCountCart(item.count);
      setIsProductInCart(true);
      setPriceState(item.price);
    } else {
      setCountCart(1);
      setIsProductInCart(false);
    }
  }, [id]);

  const updateCartQuantity = (newCount?: number) => {
    const quantity = newCount ?? countCart;

    if (quantity > count) {
      toast.error("موجودی کافی نیست");
      setCountCart(count);
      return;
    }

    let newCart = [...cart];
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
                setCountCart={setCountCart}
                updateCartQuantity={updateCartQuantity}
                handleProductRemoved={handleProductRemoved}
                id={id}
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
                onClick={() => {
                  // updateCartQuantity(1);
                  setIsOpenModalOff(true);
                }}
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
