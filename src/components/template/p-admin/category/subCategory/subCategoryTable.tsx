"use client";
import Pagination from "@/components/module/Pagination/Pagination";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import Swal from "sweetalert2";

type SubCategory = {
  _id: string;
  title: string;
  category: { title: string };
  href: string;
  img?: string | null;
};

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
};

function SubCategoryTable({
  subCategoriesServer,
  totalPages,
}: {
  subCategoriesServer?: SubCategory[];
  totalPages?: number;
}) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    ...(subCategoriesServer || []),
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const shouldFetch =
      !subCategoriesServer || !subCategoriesServer.length || currentPage > 1;
    if (shouldFetch) {
      getSubCategories();
    } else {
      setSubCategories(subCategoriesServer);
    }
  }, [currentPage, subCategoriesServer]);

  const getSubCategories = async () => {
    try {
      const response = await fetch(`/api/subCategory?page=${currentPage}`);

      if (!response.ok) throw new Error("Failed to fetch");

      const { subCategories } = await response.json();
      setSubCategories(subCategories);
    } catch (error) {
      console.error("Error fetching subCategories:", error);
    }
  };

  const removeSub = async (id: string) => {
    const result = await Swal.fire({
      title: "آیا از حذف این زیردسته مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف شود!",
      cancelButtonText: "خیر",
      customClass: {
        popup: "!text-xs font-danaMed",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/subCategory/${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire({ icon: "success", title: "زیردسته با موفقیت حذف شد" });
          getSubCategories();
        }
      } catch (err) {
        console.error("Error deleting subCategory:", err);
      }
    }
  };

  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">شماره</th>
              <th className="px-6 py-3">عکس</th>
              <th className="px-6 py-3">عنوان</th>
              <th className="px-6 py-3">والد</th>
              <th className="px-6 py-3">لینک</th>
              <th className="px-6 py-3">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {subCategories.map((item, index) => (
              <tr
                key={item._id}
                className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
              >
                <th className="px-6 py-4 ss02 font-medium text-gray-900 whitespace-nowrap">
                  {(currentPage - 1) * (totalPages?.limit ?? 6) + index + 1}
                </th>
                <td className="px-6 py-4">
                  {item.img ? (
                    <Image
                      src={item.img}
                      width={90}
                      height={90}
                      alt={item.title}
                    />
                  ) : (
                    <MdNoPhotography className="text-gray-400" size={40} />
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">
                  {item.category?.title || "بدون دسته بندی"}
                </td>
                <td className="px-6 py-4">{item.href}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:underline">
                      ویرایش
                    </button>
                    <button
                      onClick={() => removeSub(item._id)}
                      className="text-red-600 hover:underline mr-2"
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

      {totalPages !== 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default SubCategoryTable;
