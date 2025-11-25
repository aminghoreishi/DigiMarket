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
  const [products, setProducts] = useState([]);
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("product") || "[]");
    setProducts(cart);
  }, []);

  useEffect(() => {
    const isProductInCart = products.some(
      (pro: { id: string }) => pro.id === id
    );
    setIsProductInCart(isProductInCart);
  }, [products, id]);

  useEffect(() => {
    if (countCart > count) {
      setCountCart(count);
    }
  }, [countCart]);

  const handleProductRemoved = () => {
    const cart = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(cart);
  };

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
      mainCount,
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
        setIsProductInCart(true);
      }
    } else {
      cart.push(cartObject);
      localStorage.setItem("product", JSON.stringify(cart));
      toast.success("محصول به سبد خرید اضافه شد", {
        style: { fontFamily: "dana", fontSize: "14px" },
        className: "!font-danaMed",
        duration: 3000,
      });
      setIsProductInCart(true);
    }
  };

  return (
    <>
      {isProductInCart && (
        <div>
          <CartAddCount
            countServer={count}
            countCart={countCart}
            id={id}
            setCountCart={setCountCart}
            handleProductRemoved={handleProductRemoved}
          />
        </div>
      )}

      {!isProductInCart && (
        <div className="mt-4">
          <button
            onClick={(e) => addProduct(e)}
            className="bg-orange-500 select-none text-white p-2 rounded-lg font-danaMed w-full text-sm cursor-pointer"
          >
            افزودن به سبد خرید
          </button>
        </div>
      )}
      {isProductInCart && (
        <div className="mt-4">
          <Link href="/cart">
            <button className="bg-green-500 select-none text-white p-2 rounded-lg font-danaMed w-full text-sm">
              مشاهده سبد خرید
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default CartContainer;
