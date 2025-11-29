import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";
import React from "react";

function SearchProContainer({ findedProducts }) {
  return (
    <>
      {findedProducts.length === 0 ? (
        <div className="col-span-3 text-center text-gray-500 mt-10">
          متأسفانه محصولی یافت نشد.
        </div>
      ) : (
        findedProducts.map((item) => <SwiperProduct key={item._id} {...item} />)
      )}
    </>
  );
}

export default SearchProContainer;
