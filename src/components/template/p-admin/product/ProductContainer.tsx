"use client";

import Link from "next/dist/client/link";
import SearchBar from "./SearchBar";
import Table from "./Table";
import Swal from "sweetalert2";
import { useState } from "react";

function ProductContainer({
  products,
  totalPages,
}: {
  products: any[];
  totalPages: number;
}) {
  const [proSatate, setProSatate] = useState([...products]);

  const removeProduct = async (id: string) => {
    Swal.fire({
      title: "آیا از حذف این محصول مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/product/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            try {
              const res = await fetch("/api/product");
              if (res.ok) {
                const data = await res.json();
                setProSatate(data);
              }
            } catch (error) {
              console.error("Error fetching products:", error);
            }

            Swal.fire("محصول با موفقیت حذف شد!", "", "success");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  return (
    <div className="mt-5">
      <div>
        <SearchBar removeProduct={removeProduct} />
      </div>
      <div className="flex justify-end">
        <Link href="/admin/products/createProduct">
          <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">
            ایجاد محصول جدید
          </button>
        </Link>
      </div>
      <Table
        products={JSON.parse(JSON.stringify(products))}
        totalPages={totalPages}
        setProSatate={setProSatate}
        removeProduct={removeProduct}
        proSatate={proSatate}
      />
    </div>
  );
}

export default ProductContainer;
