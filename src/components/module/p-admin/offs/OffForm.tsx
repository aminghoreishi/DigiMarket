"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Off, OffFormValues } from "@/types/off";

type SubCategory = {
  _id: string;
  title: string;
};

type Product = {
  _id: string;
  name: string;
};

type OffFormProps = {
  subCategories: SubCategory[];
  setOffs: React.Dispatch<React.SetStateAction<Off[]>>;
  currentPage: number;
};

export default function OffForm({
  subCategories,
  setOffs,
  currentPage,
}: OffFormProps) {
  const [subCat, setSubCat] = useState<string>("");
  const [product, setProduct] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OffFormValues>({
    mode: "all",
  });

  /* گرفتن محصولات */
  useEffect(() => {
    if (!subCat) return;

    const getProducts = async () => {
      setLoadingProducts(true);
      const res = await fetch(`/api/product/admin/${subCat}`);
      if (!res.ok) return;

      const data: Product[] = await res.json();
      setProduct(Array.isArray(data) ? data : []);
      setLoadingProducts(false);
    };

    getProducts();
  }, [subCat]);

  /* ثبت کد تخفیف */
  const addCode: SubmitHandler<OffFormValues> = async (data) => {
    const response = await fetch("/api/offs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: data.off,
        max: data.max,
        discount: data.discount,
        product: data.product,
      }),
    });

    if (!response.ok) return;

    await getOffs();
  };

  /* گرفتن لیست آف‌ها */
  const getOffs = async () => {
    const res = await fetch(`/api/offs?page=${currentPage}`);
    if (!res.ok) return;

    const data: { offs: Off[] } = await res.json();
    setOffs(data.offs);
  };

  return (
    <form onSubmit={handleSubmit(addCode)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="flex flex-col">
          <label className="text-sm">کد تخفیف</label>
          <input
            {...register("off", { required: "کد تخفیف الزامی است" })}
            className="border-2 rounded-xl px-3 py-2"
          />
          {errors.off && <p className="text-red-500 text-xs">{errors.off.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm">حداکثر استفاده</label>
          <input
            type="number"
            {...register("max", { valueAsNumber: true })}
            className="border-2 rounded-xl px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">درصد تخفیف</label>
          <input
            type="number"
            {...register("discount", { valueAsNumber: true })}
            className="border-2 rounded-xl px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">دسته‌بندی</label>
          <select
            onChange={(e) => setSubCat(e.target.value)}
            defaultValue=""
            className="border-2 rounded-xl px-3 py-2"
          >
            <option value="" disabled>انتخاب دسته‌بندی</option>
            {subCategories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {product.length > 0 && (
          <div className="flex flex-col">
            <label className="text-sm">محصول</label>
            <select
              {...register("product", { required: true })}
              className="border-2 rounded-xl px-3 py-2"
            >
              <option value="">انتخاب محصول</option>
              {product.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-xl">
        ثبت
      </button>
    </form>
  );
}
