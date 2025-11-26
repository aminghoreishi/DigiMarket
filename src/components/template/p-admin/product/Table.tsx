"use client";
import Pagination from "@/components/module/Pagination/Pagination";
import Image from "next/image";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";

function Table({ products }: { products: any[] }) {
  const [proSatate, setProSatate] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, settotalPages] = useState(0);

  useEffect(() => {
    if (currentPage === 1 && products?.length) {
      setProSatate(products);
    } else {
      getProducts(currentPage);
    }
  }, [currentPage, products]);

  const getProducts = async (page: number) => {
    try {
      const res = await fetch(`/api/product/admin?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setProSatate(data.data);
        settotalPages(data.totalPages);
        console.log(data.totalPages);
        console.log(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                عکس محصول
              </th>
              <th scope="col" className="px-6 py-3">
                اسم محصول
              </th>
              <th scope="col" className="px-6 py-3">
                دسته بندی محصول
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3">
                مقدار
              </th>
              <th scope="col" className="px-6 py-3">
                رنگ
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {proSatate.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center font-danaMed py-4">
                  هیچ محصولی یافت نشد.
                </td>
              </tr>
            )}
            {proSatate.map((pro) => (
              <tr
                key={pro._id}
                className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Image
                    src={`http://localhost:3000${pro.images[0] || pro.images[1]}`}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </th>
                <td className="px-6 py-4">{pro.name}</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">
                  {pro.price.toLocaleString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  {pro.count.toLocaleString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {pro.colors.map(
                      (
                        c:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | Promise<
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactPortal
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | null
                              | undefined
                            >
                          | null
                          | undefined
                      ) => (
                        <div key={c}>{c}</div>
                      )
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:underline">
                      ویرایش
                    </button>
                    <button
                      className="text-red-600 hover:underline mr-2"
                      onClick={() => removeProduct(pro._id)}
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
      {currentPage > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default Table;
