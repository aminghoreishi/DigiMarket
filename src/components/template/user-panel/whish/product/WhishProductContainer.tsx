"use client";
import React, { useEffect, useState } from "react";

import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";
import Pagination from "@/components/module/Pagination/Pagination";

function WhishProductContainer() {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const whish = JSON.parse(localStorage.getItem("which") || "[]");

    setProductIds(whish);
    setTotalPages(Math.ceil(whish.length / 3));
  }, []);


  useEffect(() => {
    if (!productIds.length) return;

    const getWhish = async () => {
      const res = await fetch(`/api/whish?page=${currentPage}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productIds),
      });

      const data = await res.json();
      setProducts(data.findProduct);
    };

    getWhish();
  }, [currentPage, productIds]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((item) => (
          <SwiperProduct key={item._id} {...item} rate={[]} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

export default WhishProductContainer;
