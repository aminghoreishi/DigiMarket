"use client";

import React, { useEffect } from "react";
import Pagination from "../../Pagination/Pagination";
import Swal from "sweetalert2";

type Off = {
  _id: string;
  code: string;
  max: number;
  discount: number;
  use: number;
  user: string[];
  createdAt: string;
};

type OffTableProps = {
  offs: Off[];
  setOffs: React.Dispatch<React.SetStateAction<Off[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  initialOffs: Off[];
};

export default function OffTable({
  offs,
  setOffs,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  initialOffs,
}: OffTableProps) {
  useEffect(() => {
    if (currentPage === 1) {
      setOffs(initialOffs);
      return;
    }

    getOffs(currentPage);
  }, [currentPage]);

  const getOffs = async (page: number): Promise<void> => {
    try {
      const res = await fetch(`/api/offs/?page=${page}`);
      if (!res.ok) return;

      const data: { offs: Off[]; totalPages: number } = await res.json();
      setOffs(data.offs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching offs:", error);
    }
  };

  const removeOffs = async (id: string) => {
    Swal.fire({
      title: "آیا از حذف این تخفیف مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
      customClass: {
        popup: "!text-xs",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteOff(id);
        Swal.fire({
          title: "با موفقعیت حذف شد",
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "باشه",
          customClass: {
            popup: "!text-xs",
          },
        });
      }
    });
  };

  const deleteOff = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/offs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        getOffs(currentPage);
      }
    } catch (error) {
      console.error("Error deleting off:", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-danaMed">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">کد</th>
              <th className="px-6 py-3">حداکثر</th>
              <th className="px-6 py-3">استفاده شده</th>
              <th className="px-6 py-3">تخفیف</th>
              <th className="px-6 py-3">جزییات</th>
            </tr>
          </thead>

          <tbody>
            {offs.map((off) => (
              <tr
                key={off._id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {off.code}
                </td>
                <td className="px-6 py-4 ss02">{off.max}</td>
                <td className="px-6 py-4 ss02">{off.use}</td>
                <td className="px-6 py-4 ss02">{off.discount}٪</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeOffs(off._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-xs"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
