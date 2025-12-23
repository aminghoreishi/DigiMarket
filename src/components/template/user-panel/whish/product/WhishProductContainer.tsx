"use client";
import React, { useEffect, useState } from "react";

import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";
import { title } from "process";
function WhishProductContainer() {
  const [productsLocalStorage, setProductsLocalStorage] = useState([]);

  useEffect(() => {
    const getWhishLocalS = JSON.parse(localStorage.getItem("which"));
    setProductsLocalStorage(getWhishLocalS);
  }, []);

  useEffect(() => {
    console.log(productsLocalStorage);

    const getWhish = async () => {
      const res = await fetch("/api/whish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productsLocalStorage),
      });

      const response = await res.json();

      setProductsLocalStorage(response);

      console.log(response);
    };

    getWhish();
  }, [productsLocalStorage]);

  return (
    <div>
      {productsLocalStorage?.findProduct?.map((item) => (
        <SwiperProduct
          title={item.title}
          images={item.images}
          price={item.price}
          _id={item._id}
          colors={item.colors}
          name={item.name}
          rate={[]}
        />
      ))}
    </div>
  );
}

export default WhishProductContainer;
