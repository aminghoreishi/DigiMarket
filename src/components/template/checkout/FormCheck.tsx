"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type RHFFormData = {
  fullName: string;
  phone: string;
  address1: string;
  address2?: string;
};

type CartItemForApi = {
  productId: number;
  quantity: number;
};

interface FormCheckProps {
  fullName: string;
  deliveryMethod: "express" | "courier";
  setDeliveryMethod: React.Dispatch<React.SetStateAction<"express" | "courier">>;
  allPrice: number;
  authUserId: string;
}

export default function FormCheck({
  fullName,
  deliveryMethod,
  setDeliveryMethod,
  allPrice,
  authUserId,
}: FormCheckProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RHFFormData>({ mode: "all" });
  const [carts, setCarts] = useState<CartItemForApi[]>([]);

  useEffect(() => {
    setValue("fullName", fullName);
  }, [fullName, setValue]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("product");
      const data: any[] = raw ? JSON.parse(raw) : [];
      const itemsForOrder: CartItemForApi[] = data.map((item) => ({
        productId: item.id as number,
        quantity: item.count || 1,
      }));
      setCarts(itemsForOrder);
    } catch (err) {
      setCarts([]);
    }
  }, []);

  const onSubmit = async (data: RHFFormData) => {
    if (!authUserId || authUserId.trim() === "") {
      alert("کاربر شناسایی نشد. لطفاً دوباره وارد شوید.");
      router.push("/login");
      return;
    }
    const savedData = {
      ...data,
      user: authUserId,
      deliveryMethod,
      products: carts.map((item) => ({
        product: item.productId,
        count: item.quantity,
      })),
      totalPrice: allPrice,
    };
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(savedData),
    });
    if (res.ok) {
      localStorage.removeItem("product");
      router.push("/");
    }
  };

  return (
    <div className="border-2 border-zinc-200 rounded-xl p-5 md:p-8">
      <form className="grid grid-cols-12 gap-6 font-danaMed" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 md:col-span-6">
          <label htmlFor="fullName" className="block text-sm mb-1">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: true })}
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
            {...register("phone", { required: true })}
            id="phone"
            required
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
            placeholder="09123456789"
          />
        </div>
        <div className="col-span-12">
          <label htmlFor="address1" className="block text-sm mb-1">
            آدرس اول <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address1"
            required
            rows={3}
            {...register("address1", { required: true })}
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none resize-none focus:border-orange-500 transition-colors"
            placeholder="خیابان، کوچه، پلاک، واحد، طبقه و ..."
          />
        </div>
        <div className="col-span-12">
          <label htmlFor="address2" className="block text-sm mb-1">
            آدرس دوم (اختیاری)
          </label>
          <textarea
            id="address2"
            {...register("address2")}
            rows={3}
            className="w-full px-4 py-2.5 text-sm border-2 border-zinc-200 rounded-xl outline-none resize-none focus:border-orange-500 transition-colors"
            placeholder="در صورت نیاز به آدرس دوم..."
          />
        </div>
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
