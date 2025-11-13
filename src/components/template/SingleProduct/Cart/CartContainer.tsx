"use client";
import { useEffect, useState } from "react";
import CartAddCount from "./CartAddCount";
function CartContainer({
  count,
  name,
  id,
  price,
  img,
}: {
  count: number;
  name: string;
  id: string;
  price: number;
  img: string;
}) {
  const [countCart, setCountCart] = useState(1);

  const addProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("product")) || [];

    const cartObject = {
      id,
      name,
      price,
      count: countCart,
      img,
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
      } else {
        cart.push(cartObject);
        localStorage.setItem("product", JSON.stringify(cart));
      }
    } else {
      cart.push(cartObject);
      localStorage.setItem("product", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    if (countCart > count) {
      setCountCart(count);
    }
  }, [countCart]);

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
