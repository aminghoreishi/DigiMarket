"use client";

import { useState } from "react";
import Image from "next/image";
function Table({ brands }: { brands?: any }) {
  const [brandState, setBrandState] = useState([...brands]);
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
          {brandState.map((brand: any, index: number) => (
            <tr key={brand._id} className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200">
              <th
                scope="row"
                className="px-6 ss02 py-4 font-medium text-gray-900 whitespace-nowrap"
              >{index + 1}</th>
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
                  <button className="border-2 disabled:cursor-not-allowed disabled:opacity-60 transition-all rounded-xl hover:bg-red-500 hover:text-white border-red-500 text-red-500 px-3 py-2 cursor-pointer">
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
