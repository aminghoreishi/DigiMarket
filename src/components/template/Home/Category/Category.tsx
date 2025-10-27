import Image from "next/image";
import Link from "next/link";
import React from "react";

function Category() {
  return (
    <div
      className="container mx-auto mt-5
    "
    >

      <div className="flex justify-center gap-x-3">
        <Link href="/product/laptop/asus">
        <div className="rounded-xl p-2">
          <div className="border-2 border-gray-300 p-2 rounded-lg">
            <Image
              src="https://amirtttk.ir/digiStar/assets/image/category/4.webp"
              width={80}
              height={100}
              alt="cat"
            />
          </div>
          <div className="flex justify-center mt-2 font-danaMed text-sm">
            <h2>لپ تاپ</h2>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
