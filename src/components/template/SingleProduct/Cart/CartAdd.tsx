"use client";

import { useState } from "react";
import CartContainer from "./CartContainer";
import CartDetail from "./CartDetail";

type CartAddProps = {
  count: number;
  price: number;
  delivery: boolean | number;
  name: string;
  id: string;
  img: string;
  color: string;
  isLoggedIn: boolean;
  userID: string;
};

function CartAdd({
  count,
  price,
  delivery,
  name,
  id,
  img,
  isLoggedIn,
  userID,
  color,
}: CartAddProps) {
  const [priceState, setPriceState] = useState<number>(price);

  return (
    <div className="mt-5 select-none">
      <div className="rounded-xl border-2 border-zinc-200 p-5 space-y-4">
        <CartDetail
          delivery={delivery}
          price={priceState}
          count={count}
        />

        <CartContainer
          isLoggedIn={isLoggedIn}
          userID={userID}
          priceState={priceState}
          setPriceState={setPriceState}
          count={count}
          name={name}
          id={id}
          img={img}
          color={color}
          mainCount={count}
        />
      </div>
    </div>
  );
}

export default CartAdd;
