"use client";

import { useState } from "react";
import { BeatLoader } from "react-spinners";

function OrderModal({
  setIsModalOpen,
  order,
  getOrders,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: any;
}) {
  const [phone, setPhone] = useState(order?.phone || "");
  const [address1, setAddress1] = useState(order?.address1 || "");
  const [status, setStatus] = useState(order?.status || "pending");
  const [price, setPrice] = useState(order?.totalPrice || 0);
  const [namePro, setNamePro] = useState(order?.products || []);
  const [address2, setAddress2] = useState(order?.address2 || "");
  const [email, setEmail] = useState(order?.user.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/order/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          address1,
          status,
          address2,
          totalPrice: price,
          user: order.user._id,
          products: namePro,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Order updated successfully
        console.log("Order updated successfully");
        setIsModalOpen(false);
        getOrders(1);
      } else {
        // Handle error response
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("An error occurred while updating the order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl text-xs bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 bg-brand/5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-heading">ویرایش سفارش</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-heading">
                  سفارشات{" "}
                </label>
                <ul>
                  {namePro.map((np: any) => (
                    <li key={np.product._id} className="mb-1">
                      {np.product.title} - تعداد:{" "}
                      <input
                        type="number"
                        className="w-16 px-2 py-1 border rounded"
                        defaultValue={np.count}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  قیمت
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="24,500,000"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  شماره موبایل
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  ایمیل
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  وضیعت
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                >
                  <option value="pending">در حال اماده سازی</option>
                  <option value="shipped">در حال ارسال</option>
                  <option value="delivered">تحویل داده شده</option>
                  <option value="cancelled">لغو شده </option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-heading">
                ادرس یک
              </label>
              <textarea
                rows={3}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                placeholder="لپ‌تاپ سبک و مناسب کارهای روزمره..."
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-heading">
                ادرس دو
              </label>
              <textarea
                rows={4}
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                placeholder="مشخصات فنی، ویژگی‌ها و..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            لغو
          </button>
          <button
            onClick={editOrder}
            disabled={isLoading}
            className="px-8 py-3 bg-brand text-black rounded-xl font-medium hover:bg-brand-strong transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <BeatLoader size={8} color="black" /> : "ویرایش سفارش"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
