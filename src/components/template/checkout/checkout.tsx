'use client'
import { useState } from "react";

import FormCheck from "./FormCheck";
import Summary from "./Summary";

function Checkout({isUserLoggedIn , allPrice}: {isUserLoggedIn: null | {id: string; fullName: string; email: string;}; allPrice: number}) {
    const [deliveryMethod, setDeliveryMethod] = useState<"express" | "courier">("express");

  return (
    <div className="grid grid-cols-12 gap-5 mt-8">
      <div className="col-span-8">
        <FormCheck allPrice={allPrice} userId={isUserLoggedIn?._id || ""} fullName={isUserLoggedIn?.fullName || ""} deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
      </div>
      <div className="col-span-4">
        <Summary deliveryMethod={deliveryMethod} allPrice={allPrice} />
      </div>
    </div>
  );
}

export default Checkout;
