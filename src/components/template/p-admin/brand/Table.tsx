"use client";

import Image from "next/image";
import Swal from "sweetalert2";

function Table({
  brands,
  setBrandState,
}: {
  brands?: any;
  setBrandState?: any;
}) {
  const removeBrand = async (id: string) => {
    Swal.fire({
      title: "آیا از حذف برند اطمینان دارید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، حذف شود!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBrand(id);
        Swal.fire("حذف شد!", "برند مورد نظر حذف شد.", "success");
      }
    });
  };

  const deleteBrand = async (id: string) => {
    const res = await fetch(`/api/brand/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBrandState((prevBrands: any) =>
        prevBrands.filter((brand: any) => brand._id !== id)
      );
    } else {
      console.error("Failed to delete brand");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-600">
        <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              شماره
            </th>
            <th scope="col" className="px-6 py-3">
              عکس
            </th>
            <th scope="col" className="px-6 py-3">
              عنوان
            </th>
            <th scope="col" className="px-6 py-3">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand: any, index: number) => (
            <tr
              key={brand._id}
              className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
            >
              <th
                scope="row"
                className="px-6 ss02 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {index + 1}
              </th>
              <td className="px-6 ss02 py-4">
                <Image
                  src={brand.img}
                  alt={brand.title}
                  width={50}
                  height={50}
                />
              </td>
              <td className="px-6 py-4">{brand.title}</td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeBrand(brand._id)}
                    className="border-2 disabled:cursor-not-allowed disabled:opacity-60 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
