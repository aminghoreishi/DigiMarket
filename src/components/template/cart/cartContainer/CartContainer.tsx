"use client";
import { useEffect, useState } from "react";
import CartCom from "./CartCom";
function CartContainer() {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    const carts = localStorage.getItem("product");
    if (carts?.length) setCarts(JSON.parse(carts));
  }, []);
  return (
    <div className="border-2 border-zinc-200 rounded-xl p-3">
      {carts.map((cart) => (
        <CartCom key={cart.id} cart={cart} />
      ))}
    </div>
  );
}

export default CartContainer;
