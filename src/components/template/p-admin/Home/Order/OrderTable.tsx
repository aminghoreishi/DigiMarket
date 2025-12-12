"use client";
import { getDaysAgo } from "@/utils/cal";
import { useState } from "react";
import OrderModal from "./OrderModal";
function OrderTable({ orders }: { orders: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);
  return (
    <>
      {isModalOpen && (
        <OrderModal setIsModalOpen={setIsModalOpen} order={order} />
      )}
      <h2 className="font-danaMed mb-5">اخرین سفارشات</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  font-danaMed">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs font-danaMed text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                شماره سفارش
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
            {orders.map((ord) => (
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
      </div>
    </>
  );
}

export default OrderTable;
