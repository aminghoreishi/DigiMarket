"use client";
import { useEffect, useState } from "react";
import OrderModal from "../Home/Order/OrderModal";
import { getDaysAgo } from "@/utils/cal";
import Pagination from "@/components/module/Pagination/Pagination";

function OrderTable({
  orders,
  totalPages,
}: {
  orders: any[];
  totalPages: number;
}) {
  const [orderState, setOrderState] = useState([...orders]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(totalPages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (currentPage === 1 && orders.length) {
      setOrderState(orders);
    } else {
      getOrders(currentPage);
    }
  }, [orders, currentPage]);

  const getOrders = async (page: number) => {
    try {
      const res = await fetch(`/api/order?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setOrderState(data.data);
        setTotalPage(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  font-danaMed">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                شماره سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                کاربر
              </th>

              <th scope="col" className="px-6 py-3">
                تاریخ
              </th>
              <th scope="col" className="px-6 py-3">
                مبلغ
              </th>
              <th scope="col" className="px-6 py-3">
                جزییات
              </th>
            </tr>
          </thead>
          <tbody>
            {orderState.map((ord) => (
              <tr
                key={ord._id}
                className="odd:bg-white font-danaMed even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {ord._id}
                </th>
                <td className="px-6 py-4">
                  {ord.user?.fullName || "کاربر ناشناس"}
                </td>
                <td className="px-6 py-4">
                  {getDaysAgo(ord.createdAt ?? "")}{" "}
                  {new Date(ord.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-6 py-4 ss02 ">
                  {ord.totalPrice.toLocaleString("fa-IR")}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setOrder(ord);
                      setIsModalOpen(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                  >
                    جزییات سفارش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        {isModalOpen && (
          <OrderModal
            setIsModalOpen={setIsModalOpen}
            order={order}
            getOrders={getOrders}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
}

export default OrderTable;
