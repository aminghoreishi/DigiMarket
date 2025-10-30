import React from "react";
import PopProductCom from "./PopProductCom";

function PopProductContainer() {
  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-center">
        <h2 className="font-danaMed text-lg">پرفروش ترین محصولات</h2>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 divide-y-2 divide-zinc-200">
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
      </div>
    </div>
  );
}

export default PopProductContainer;
