"use client";
import { useState } from "react";

export default function FormCheck() {
  const [deliveryMethod, setDeliveryMethod] = useState<"express" | "courier">("express");

  return (
    <div className="border-2 border-zinc-200 rounded-xl p-5 md:p-8">
      <form className="grid grid-cols-12 gap-6 font-danaMed">
        {/* نام و نام خانوادگی + شماره تماس اصلی */}
        <div className="col-span-12 md:col-span-6">
          <label htmlFor="fullName" className="block text-sm mb-1">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="fullName"
            required
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
            placeholder="مثال: علی رضایی"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label htmlFor="phone" className="block text-sm mb-1">
            شماره تماس <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
            placeholder="09123456789"
          />
        </div>

        {/* آدرس اول */}
        <div className="col-span-12">
          <label htmlFor="address1" className="block text-sm mb-1">
            آدرس اول <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address1"
            required
            rows={3}
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none resize-none focus:border-orange-500 transition-colors"
            placeholder="خیابان، کوچه، پلاک، واحد، طبقه و ..."
          />
        </div>

        {/* آدرس دوم (اختیاری) */}
        <div className="col-span-12">
          <label htmlFor="address2" className="block text-sm mb-1">
            آدرس دوم (اختیاری)
          </label>
          <textarea
            id="address2"
            rows={3}
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none resize-none focus:border-orange-500 transition-colors"
            placeholder="در صورت نیاز به آدرس دوم..."
          />
        </div>

        {/* روش ارسال */}
        <fieldset className="col-span-12">
          <legend className="text-sm mb-3">روش ارسال</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`flex items-center justify-center gap-3 px-6 py-4 border-2 rounded-xl cursor-pointer transition-all ${
                deliveryMethod === "express"
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-zinc-200 hover:border-orange-300"
              }`}
            >
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={deliveryMethod === "express"}
                onChange={() => setDeliveryMethod("express")}
                className="w-5 h-5 text-orange-600"
              />
              <span className="font-danaDemi text-base">پست پیشتاز</span>
              <span className="text-xs text-zinc-500">۳-۵ روز کاری</span>
            </label>

            <label
              className={`flex items-center justify-center gap-3 px-6 py-4 border-2 rounded-xl cursor-pointer transition-all ${
                deliveryMethod === "courier"
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-zinc-200 hover:border-orange-300"
              }`}
            >
              <input
                type="radio"
                name="delivery"
                value="courier"
                checked={deliveryMethod === "courier"}
                onChange={() => setDeliveryMethod("courier")}
                className="w-5 h-5 text-orange-600"
              />
              <span className="font-danaDemi text-base">پیک (فقط تهران)</span>
              <span className="text-xs text-zinc-500">همان روز</span>
            </label>
          </div>
        </fieldset>

        {/* دکمه ثبت سفارش */}
        <div className="col-span-12">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-danaDemi hover:bg-orange-600 transition-colors"
          >
            ثبت و ادامه خرید
          </button>
        </div>
      </form>
    </div>
  );
}