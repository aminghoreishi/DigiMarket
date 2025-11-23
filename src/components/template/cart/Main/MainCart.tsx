"use client";
import TopSec from "../TopSec/TopSec";
import MainCart from "../MainCart/MainCart";
import { useState } from "react";
import Checkout from "../../checkout/checkout";

function MainCartContainer({
  isUserLoggedIn,
}: {
  isUserLoggedIn: null | { id: string; fullName: string; email: string };
}) {
  const [step, setStep] = useState("cart");
  return (
    <div className="container mx-auto">
      <TopSec step={step} />

      <div>
        {step === "cart" && (
          <div>
            <MainCart isUserLoggedIn={isUserLoggedIn} setStep={setStep} />
          </div>
        )}
        {step === "checkout" && (
          <div>
            <Checkout isUserLoggedIn={isUserLoggedIn} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainCartContainer;
