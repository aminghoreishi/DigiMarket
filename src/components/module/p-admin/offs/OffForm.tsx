"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function OffForm({ subCategories }: { subCategories: any }) {
  const [subCat, setSubCat] = useState("");
  const [product, setProduct] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`/api/product/${subCat}`);
      const data = await res.json();
      setProduct(Array.isArray(data.product) ? data.product : []);
    };
    getProducts();
  }, [subCat]);

  const addCode = async (data: any) => {
    const response = await fetch("/api/offs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.off,
        max: data.max,
        discount: data.discount,
        product: data.product,
      }),
    });

    const dataRes = await response.json();

    console.log(dataRes);
  };

  return (
    <form onSubmit={handleSubmit(addCode)}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-baseline lg:grid-cols-3 gap-6">
        <div className="font-danaMed flex flex-col">
          <label className="text-sm" htmlFor="">
            کد تخفیف
          </label>
          <input
            type="text"
            {...register("off", {
              required: "نام محصول الزامی است",
            })}
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
          />
          {errors.off && (
            <p className="text-red-500 text-xs mt-2">{errors.off.message}</p>
          )}
        </div>
        <div className="font-danaMed flex flex-col">
          <label className="text-sm" htmlFor="">
            حداکثر استفاده
          </label>
          <input
            type="text"
            {...register("max", {
              required: "نام محصول الزامی است",
            })}
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
          />
          {errors.max && (
            <p className="text-red-500 text-xs mt-2">{errors.max.message}</p>
          )}
        </div>
        <div className="font-danaMed flex flex-col">
          <label className="text-sm" htmlFor="">
            درصد تخفیف
          </label>
          <input
            type="text"
            {...register("discount", {
              required: "نام محصول الزامی است",
            })}
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
          />
          {errors.discount && (
            <p className="text-red-500 text-xs mt-2">
              {errors.discount.message}
            </p>
          )}
        </div>
        <div className="font-danaMed flex flex-col">
          <label className="text-sm" htmlFor="">
            دسته بندی
          </label>
          <select
            className="border-2  outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            onChange={(e) => setSubCat(e.target.value)}
          >
            {subCategories.map((subCat: any) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.title}
              </option>
            ))}
          </select>
        </div>

        {product.length > 0 && (
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              محصول
            </label>
            <select
              className="border-2  outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
              {...register("product", {
                required: "انتخاب محصول الزامی است",
              })}
            >
              <option value="">انتخاب محصول</option>
              {product.map((subCat: any) => (
                <option key={subCat._id} value={subCat._id}>
                  {subCat.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-8">
        <button className="bg-blue-500 text-white px-8 py-2 rounded-xl cursor-pointer">
          ثبت
        </button>
      </div>
    </form>
  );
}

export default OffForm;
