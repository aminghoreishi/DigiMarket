"use client";
import Image from "next/image";
import { useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import Swal from "sweetalert2";
type SubCategory = {
  _id: string;
  title: string;
  category: { title: string };
  href: string;
  img?: string | null;
};
function subCategoryTable({ data }: { data: SubCategory[] }) {
  const [subCategory, setSubCategory] = useState([...data]);

  const getSubCategories = async () => {
    try {
      const response = await fetch("/api/subCategory");

      if (response.ok) {
        const data = await response.json();
        setSubCategory(data);
      }
    } catch (error) {
      console.error("Error fetching subCategories:", error);
    }
  };

  const removeSub = async (id: string) => {
    Swal.fire({
      title: "آیا از حذف این زیردسته مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف شود!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/subCategory/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "زیردسته با موفقیت حذف شد",
            }).then(() => {
              getSubCategories();
            });
          }
        } catch (error) {
          console.error("Error deleting subCategory:", error);
        }
      }
    });
  };

  return (
    <div className="mt-5">
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
                والد
              </th>
              <th scope="col" className="px-6 py-3">
                لینک
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {subCategory.map((item, index) => (
              <tr
                key={item._id}
                className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 ss02 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  {item.img ? (
                    <Image
                      src={item.img}
                      width={90}
                      height={90}
                      alt="subCategory"
                    />
                  ) : (
                    <MdNoPhotography className="text-gray-400" size={40} />
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.category.title}</td>
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
    </div>
  );
}

export default subCategoryTable;
