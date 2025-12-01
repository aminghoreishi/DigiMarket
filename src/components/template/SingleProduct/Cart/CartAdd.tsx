"use client";

import { useState } from "react";

import CartContainer from "./CartContainer";
import CartDetail from "./CartDetail";
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
}: {
  count: number;
  price: number;
  delivery: boolean | number;
  name: string;
  id: string;
  img: string;
  color: string;
}) {
  const [priceState, setPriceState] = useState(price);
  return (
    <div className="mt-5 select-none">
      <div className="rounded-xl border-2 border-zinc-200 p-5 space-y-4">
        <CartDetail delivery={delivery} price={priceState} count={count} />

        <div>
          <CartContainer
            isLoggedIn={isLoggedIn}
            userID={userID}
            priceState={priceState}
            setPriceState={setPriceState}
            count={JSON.parse(JSON.stringify(count))}
            name={JSON.parse(JSON.stringify(name))}
            id={JSON.parse(JSON.stringify(id))}
            price={JSON.parse(JSON.stringify(price))}
            img={JSON.parse(JSON.stringify(img))}
            color={JSON.parse(JSON.stringify(color))}
            mainCount={JSON.parse(JSON.stringify(count))}
          />
        </div>
      </div>
    </div>
  );
}

export default CartAdd;
