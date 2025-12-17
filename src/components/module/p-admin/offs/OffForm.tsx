"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SubCategory = {
  _id: string;
  title: string;
};

type Product = {
  _id: string;
  name: string;
};

type Off = {
  _id: string;
  code: string;
  max: number;
  discount: number;
};

type OffFormProps = {
  subCategories: SubCategory[];
  setOffs: React.Dispatch<React.SetStateAction<Off[]>>;
  currentPage: number;
};

type OffFormValues = {
  off: string;
  max: number;
  discount: number;
  product: string;
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

  useEffect(() => {
    if (!subCat) return;

    const getProducts = async (): Promise<void> => {
      const res = await fetch(`/api/product/admin/${subCat}`);
      if (!res.ok) return;

      const data: Product[] = await res.json();
      setProduct(Array.isArray(data) ? data : []);
    };

    getProducts();
  }, [subCat]);

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

  const getOffs = async (): Promise<void> => {
    try {
      setLoadingProducts(true);
      const res = await fetch(`/api/offs?page=${currentPage}`);
      if (!res.ok) return;

      const data: { offs: Off[] } = await res.json();
      setOffs(data.offs);
    } catch (error) {
      console.error("Error fetching offs:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(addCode)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="font-danaMed flex flex-col">
          <label className="text-sm">کد تخفیف</label>
          <input
            type="text"
            {...register("off", {
              required: "کد تخفیف الزامی است",
              minLength: { value: 3, message: "حداقل ۳ کاراکتر" },
              pattern: {
                value: /^[A-Z0-9]+$/i,
                message: "فقط حروف و عدد مجاز است",
              },
            })}
            className="border-2 rounded-xl mt-2 px-3 py-2 text-sm"
          />
          {errors.off && (
            <p className="text-red-500 text-xs mt-2">{errors.off.message}</p>
          )}
        </div>
        <div className="font-danaMed flex flex-col">
          <label className="text-sm">حداکثر استفاده</label>
          <input
            type="number"
            {...register("max", {
              required: "تعداد استفاده الزامی است",
              min: { value: 1, message: "حداقل مقدار ۱" },
              max: { value: 1000, message: "حداکثر مقدار ۱۰۰۰" },
              valueAsNumber: true,
            })}
            className="border-2 rounded-xl mt-2 px-3 py-2 text-sm"
          />
          {errors.max && (
            <p className="text-red-500 text-xs mt-2">{errors.max.message}</p>
          )}
        </div>
        <div className="font-danaMed flex flex-col">
          <label className="text-sm">درصد تخفیف</label>
          <input
            type="number"
            {...register("discount", {
              required: "درصد تخفیف الزامی است",
              min: { value: 1, message: "حداقل ۱٪" },
              max: { value: 100, message: "حداکثر ۱۰۰٪" },
              valueAsNumber: true,
            })}
            className="border-2 rounded-xl mt-2 px-3 py-2 text-sm"
          />
          {errors.discount && (
            <p className="text-red-500 text-xs mt-2">
              {errors.discount.message}
            </p>
          )}
        </div>
        <div className="font-danaMed flex flex-col">
          <label className="text-sm">دسته بندی</label>
          <select
            className="border-2 rounded-xl mt-2 px-3 py-2 text-sm"
            onChange={(e) => setSubCat(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              انتخاب دسته بندی
            </option>
            {subCategories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        {loadingProducts && (
          <p className="text-sm text-black mt-2">
            در حال بارگذاری محصولات...
          </p>
        )}
        {!loadingProducts && product.length > 0 && (
          <div className="font-danaMed flex flex-col">
            <label className="text-sm">محصول</label>
            <select
              className="border-2 rounded-xl mt-2 px-3 py-2 text-sm"
              {...register("product", {
                required: "انتخاب محصول الزامی است",
              })}
              defaultValue=""
            >
              <option value="" disabled>
                انتخاب محصول
              </option>
              {product.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {errors.product && (
              <p className="text-red-500 text-xs mt-2">
                {errors.product.message}
              </p>
            )}
          </div>
        )}
        
      </div>

      <div className="mt-8">
        <button className="bg-blue-500 text-white px-8 py-2 rounded-xl">
          ثبت
        </button>
      </div>
    </form>
  );
}
