import Image from "next/image";
import React from "react";

function PopProductCom() {
  return (
    <div className="flex items-center gap-5">
      <div>
        <Image
          src="/image/laptop.webp"
          width={200}
          height={200}
          alt="product"
        />
      </div>
      <div>
        <p className="text-2xl text-orange-500">1</p>
      </div>
      <div>
        <p className="font-danaMed text-xs md:text-sm">لپ تاپ ایسوس مدل A5436 با طراحی جدید</p>
      </div>
    </div>
  );
}

export default PopProductCom;
