"use client";
import TopSec from "../TopSec/TopSec";
import MainCart from "../MainCart/MainCart";
import { useState } from "react";
import Checkout from "../../checkout/checkout";

function MainCartContainer({
  isUserLoggedIn,
  id
}: {
  isUserLoggedIn: null | { id: string; fullName: string; email: string };
}) {
  const [step, setStep] = useState("cart");
  const [allPrice, setAllPrice] = useState(0);
  return (
    <div className="container mx-auto">
      <TopSec step={step} />

      <div>
        {step === "cart" && (
          <div>
            <MainCart setAllPrice={setAllPrice} isUserLoggedIn={isUserLoggedIn} setStep={setStep} />
          </div>
        )}
        {step === "checkout" && (
          <div>
            <Checkout id={id}  allPrice={allPrice} isUserLoggedIn={isUserLoggedIn} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainCartContainer;
