"use client";

import Image from "next/image";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
export default function EditProductModal({
  setIsModalOpen,
  product,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
}) {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [count, setCount] = useState(product?.count || 0);
  const [color, setColor] = useState(product?.color || "");
  const [delivery, setDelivery] = useState(product?.delivery || "");
  const [shortDes, setShortDes] = useState(product?.shortDescription || "");
  const [longDescription, setLongDescription] = useState(
    product?.longDescription || ""
  );
  const [name, setName] = useState(product?.name || "");
  const [images, setImages] = useState(product?.images || []);

  console.log(product);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl text-xs bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 bg-brand/5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-heading">ویرایش محصول</h3>
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
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

          {/* Body - اسکرول داخلی */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            <div className="space-y-5">
              {/* دو ستونه */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-heading">
                    عنوان
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                    placeholder="لپ‌تاپ ایسوس..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-heading">
                    نام (Slug)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                    placeholder="asus-vivobook"
                  />
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
                    موجودی
                  </label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-heading">
                    ارسال (روز)
                  </label>
                  <input
                    type="text"
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-heading">
                    رنگ‌ها
                  </label>
                  <input
                    type="text"
                    // value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition"
                    placeholder="مشکی، سفید"
                  />
                  {color && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {color.split(",").map((c: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-black bg-gray-200 rounded-full text-xs"
                        >
                          {c.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  توضیح کوتاه
                </label>
                <textarea
                  rows={3}
                  value={shortDes}
                  onChange={(e) => setShortDes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                  placeholder="لپ‌تاپ سبک و مناسب کارهای روزمره..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-heading">
                  توضیح کامل
                </label>
                <textarea
                  rows={4}
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                  placeholder="مشخصات فنی، ویژگی‌ها و..."
                />
              </div>

              {/* تصاویر - کوچیک و شیک */}
              <div>
                <label className="block mb-3 text-sm font-medium text-heading">
                  تصاویر محصول
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {images.map((i) => (
                    <div key={i} className="relative group aspect-square">
                      <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl">
                      <Image  src={`${i}`} alt={`Product image ${i}`} layout="fill" objectFit="cover" className="rounded-xl" />
                      </div>
                      <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700">
                        <HiOutlineTrash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <label className="aspect-square cursor-pointer">
                    <div className="w-full h-full border-2 border-dashed border-brand/50 bg-brand/5 rounded-xl flex items-center justify-center hover:bg-brand/10 transition">
                      {/* <Upload className="w-8 h-8 text-brand" /> */}
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-5 bg-gray-50 border-t border-gray-200">
            <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition">
              لغو
            </button>
            <button className="px-8 py-3 bg-brand text-white rounded-xl font-medium hover:bg-brand-strong transition shadow-md">
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
