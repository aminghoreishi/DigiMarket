"use client";

import Pagination from "@/components/module/Pagination/Pagination";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Brand, GetBrandsResponse } from "../../../../types/types";

type TableProps = {
  brands: Brand[];
  intialBrand: Brand[];
  setBrandState: React.Dispatch<React.SetStateAction<Brand[]>>;
  totalPageState: number;
  setTotalPageState: React.Dispatch<React.SetStateAction<number>>;
};

function Table({
  brands,
  intialBrand,
  setBrandState,
  totalPageState,
  setTotalPageState,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (currentPage === 1) {
      setBrandState(intialBrand);
      return;
    }

    getBrands(currentPage);
  }, [currentPage, intialBrand, setBrandState]);

  const getBrands = async (page: number) => {
    try {
      const res = await fetch(`/api/brand?page=${page}`);
      const data: GetBrandsResponse = await res.json();

      setBrandState(data.brands);
      setTotalPageState(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };

  const removeBrand = (id: string) => {
    Swal.fire({
      title: "آیا از حذف برند اطمینان دارید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، حذف شود!",
      cancelButtonText: "لغو",
      customClass: {
        popup: "!text-xs font-danaMed",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBrand(id);
        Swal.fire({
          title: "با موفقعیت اضافه شد",
          icon: "success",
          customClass: {
            popup: "!text-xs font-danaMed",
          },
        });
      }
    });
  };

  const deleteBrand = async (id: string) => {
    const res = await fetch(`/api/brand/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBrandState((prev) => prev.filter((brand) => brand._id !== id));
    } else {
      console.error("Failed to delete brand");
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">شماره</th>
              <th className="px-6 py-3">عکس</th>
              <th className="px-6 py-3">عنوان</th>
              <th className="px-6 py-3">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand._id} className="odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4">
                  <Image
                    src={brand.img}
                    alt={brand.title}
                    width={50}
                    height={50}
                  />
                </td>

                <td className="px-6 py-4">{brand.title}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => removeBrand(brand._id)}
                    className="border-2 rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPageState > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPageState}
        />
      )}
    </>
  );
}

export default Table;
