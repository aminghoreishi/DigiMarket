"use client";
import { useEffect, useState } from "react";
import CartAddCount from "./CartAddCount";
import toast from "react-hot-toast";
import Link from "next/link";

function CartContainer({
  count,
  name,
  id,
  price,
  img,
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
  const [countCart, setCountCart] = useState(1);
  const [cart, setCart] = useState<any[]>([]); 
  const [isProductInCart, setIsProductInCart] = useState(false);

 
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("product") || "[]");
    setCart(savedCart);

    const existing = savedCart.find((p: any) => p.id === id);
    if (existing) {
      setCountCart(existing.count);
      setIsProductInCart(true);
    }
  }, [id]);

 
  useEffect(() => {
    setIsProductInCart(cart.some((p: any) => p.id === id));
  }, [cart, id]);


  useEffect(() => {
    if (countCart > count) {
      setCountCart(count);
      toast.error("موجودی کافی نیست");
    }
  }, [countCart, count]);

 

  const updateCartQuantity = (newCount?: number) => {
    const finalCount = newCount ?? countCart; 

    const updatedCart = cart.map((item: any) => {
      if (item.id === id) {
        return { ...item, count: finalCount };
      }
      return item;
    });

    if (!cart.some((p: any) => p.id === id)) {
      updatedCart.push({
        id,
        name,
        price,
        count: finalCount,
        img,
        color,
        mainCount,
      });
      setIsProductInCart(true);
      toast.success("محصول به سبد خرید اضافه شد");
    } else {
      toast.success("تعداد محصول به‌روزرسانی شد");
    }

    setCart(updatedCart);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    setCountCart(finalCount); 
  };


  const handleProductRemoved = () => {
    const updatedCart = cart.filter((item: any) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("product", JSON.stringify(updatedCart));
    setCountCart(1);
    setIsProductInCart(false);
  };

  return (
    <>
    
      {isProductInCart && (
        <CartAddCount
          countServer={count}
          countCart={countCart}
          setCountCart={setCountCart}
          updateCartQuantity={updateCartQuantity} 
          handleProductRemoved={handleProductRemoved}
          id={id}
        />
      )}


      {!isProductInCart && (
        <div className="mt-4">
          <button
            onClick={updateCartQuantity}
            className="bg-orange-500 hover:bg-orange-600   text-sm transition text-white p-3 rounded-lg font-danaMed w-full"
          >
            افزودن به سبد خرید
          </button>
        </div>
      )}

  
      {isProductInCart && (
        <div className="mt-4">
          <Link href="/cart">
            <button className="bg-green-500 text-sm hover:bg-green-600 transition text-white p-3 rounded-lg font-danaMed w-full">
              مشاهده سبد خرید
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default CartContainer;
