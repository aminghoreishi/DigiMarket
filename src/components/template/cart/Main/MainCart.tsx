"use client";
import TopSec from "../TopSec/TopSec";
import MainCart from "../MainCart/MainCart";
import Checkout from "../../checkout/checkout";
import { useState } from "react";
import { AuthUser } from "@/types/user";

interface MainCartContainerProps {
  isUserLoggedIn: AuthUser | null;
  id: string;
  authUserId: string;
}

function MainCartContainer({
  isUserLoggedIn,
  id,
  authUserId,
}: MainCartContainerProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [allPrice, setAllPrice] = useState<number>(0);

  return (
    <div className="container mx-auto">
      <TopSec step={step} />

      {step === "cart" && (
        <MainCart
          authUserId={authUserId}
          setAllPrice={setAllPrice}
          isUserLoggedIn={!!isUserLoggedIn}
          setStep={setStep}
        />
      )}

      {step === "checkout" && (
        <Checkout
          authUserId={authUserId}
          id={id}
          allPrice={allPrice}
          isUserLoggedIn={isUserLoggedIn}
        />
      )}
    </div>
  );
}

export default MainCartContainer;
