import Image from "next/image";
import React from "react";

function SwiperProduct() {
  return (
    <div className="border-2 border-gray-200 rounded-xl">
      <div>
        <Image src="/image/3.webp" className="h-[30px]" width={60} height={60} alt="product" />
      </div>
    </div>
  );
}

export default SwiperProduct;
