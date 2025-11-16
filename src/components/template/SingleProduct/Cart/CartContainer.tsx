"use client";
import { useEffect, useState } from "react";
import CartAddCount from "./CartAddCount";
import toast from "react-hot-toast";

function CartContainer({
  count,
  name,
  id,
  price,
  img,
  color,
}: {
  count: number;
  name: string;
  id: string;
  price: number;
  img: string;
  color: string;
}) {
  const [countCart, setCountCart] = useState(1);

  useEffect(() => {
    if (countCart > count) {
      setCountCart(count);
    }
  }, [countCart]);

  const addProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("product")) || [];

    const cartObject = {
      id,
      name,
      price,
      count: countCart,
      img,
      color,
    };

    if (cart.length) {
      const isCartExit = cart.some((pro) => pro.id === id);

      if (isCartExit) {
        cart.forEach((element) => {
          if (element.id === id) {
            element.count = element.count + count;
          }
        });
        localStorage.setItem("product", JSON.stringify(cart));
        toast.success("محصول به سبد خرید اضافه شد", {
          style: { fontFamily: "dana", fontSize: "14px" },
          className: "!font-danaMed",
          duration: 3000,
        });
      } else {
        cart.push(cartObject);
        localStorage.setItem("product", JSON.stringify(cart));
        toast.success("محصول به سبد خرید اضافه شد", {
          style: { fontFamily: "dana", fontSize: "14px" },
          className: "!font-danaMed",
          duration: 3000,
        });
      }
    } else {
      cart.push(cartObject);
      localStorage.setItem("product", JSON.stringify(cart));
      toast.success("محصول به سبد خرید اضافه شد", {
        style: { fontFamily: "dana", fontSize: "14px" },
        className: "!font-danaMed",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div>
        <CartAddCount
          countServer={count}
          countCart={countCart}
          setCountCart={setCountCart}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={(e) => addProduct(e)}
          className="bg-orange-500 select-none text-white p-2 rounded-lg font-danaMed w-full text-sm cursor-pointer"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </>
  );
}

export default CartContainer;
