"use client";
import { useForm, useWatch } from "react-hook-form";

function FormContainer({ categories }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });

  const watchedCategory = useWatch({
    control,
    name: "category",
  });

  return (
    <div>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline lg:grid-cols-3 gap-6">
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              نام محصول
            </label>
            <input
              type="text"
              {...register("title", {
                required: true,
                pattern: {
                  value: /^[\u0600-\u06FF0-9\s]{3,50}$/,
                  message: "عنوان باید ۳–۵۰ کاراکتر فارسی یا عدد باشد",
                },
              })}
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              قیمت محصول
            </label>
            <input
              type="text"
              {...register("price", {
                required: "قیمت الزامی است",
                pattern: {
                  value: /^\d{1,3}(,\d{3})*$/,
                  message: "قیمت باید فقط عدد و جداکننده کاما باشد",
                },
                validate: (value) => {
                  const numericValue = Number(value.replace(/,/g, ""));
                  if (numericValue < 0) return "قیمت نمی‌تواند منفی باشد";
                  if (numericValue > 500000000)
                    return "حداکثر قیمت مجاز ۵۰۰ میلیون تومان است";
                  return true;
                },
              })}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formatted = rawValue.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
                e.target.value = formatted;
              }}
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
              placeholder="مثلاً 1,200,000"
            />

            {errors.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              دسته بندی محصول
            </label>
            <select
              {...register("category", { required: "دسته بندی الزامی هست" })}
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
            >
              <option value="">انتخاب دسته بندی</option>
              {categories.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-500 text-xs mt-2">
                {errors.category.message}
              </p>
            )}
          </div>
          {watchedCategory === "لپ تاپ" && (
            <div className="p-6 bg-blue-50 col-span-3 font-danaMed rounded-xl border border-blue-200">
              <h3 className="text-lg font-danaBold mb-4 text-blue-800">
                مشخصات لپ‌تاپ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-danaMed mb-1">رم (GB)</label>
                  <select className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs">
                    <option value="">انتخاب رم</option>
                    <option value="">8</option>
                    <option value="">16</option>
                    <option value="">32</option>
                    <option value="">64</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-danaMed mb-1">حافظه</label>
                  <select
                    dir="rtl"
                    className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
                  >
                    <option value="">انتخاب حافظه</option>
                    <option value="">256</option>
                    <option value="">512</option>
                    <option value="">1 TB</option>
                    <option value="">2 TB</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-danaMed mb-1">
                    سایز صفحه (اینچ)
                  </label>
                  <input
                    {...register("screenSize", {
                      required: "سایز صفحه الزامی است",
                      pattern: {
                        value: /^(?:\d{1,2}(?:\.\d{1,2})?)$/,
                        message:
                          "سایز صفحه باید عددی بین 10 تا 99 و حداکثر با دو رقم اعشار باشد",
                      },
                      validate: (value) => {
                        const num = parseFloat(value);
                        if (num < 10 || num > 99)
                          return "سایز صفحه باید بین 10 تا 99 اینچ باشد";
                        return true;
                      },
                    })}
                    type="text"
                    className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="15.6"
                  />
                  {errors.screenSize && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.screenSize.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-danaMed mb-1">CPU</label>
                  <input
                    {...register("cpu", {
                      required: "پردازنده الزامی است",
                      pattern: {
                        value:
                          /^(Intel\s*(Core\s*)?(i[3579]|Xeon)\s*[A-Za-z0-9\- ]{0,20}|(AMD\s*)?(Ryzen\s*\d?\s*[A-Za-z0-9\- ]{0,20}))$/i,
                        message:
                          "فرمت CPU معتبر نیست (مثلاً Intel i7-13700H یا Ryzen 7 9800X3D)",
                      },
                    })}
                    type="text"
                    className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="Intel i7-13700H"
                  />
                  {errors.cpu && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.cpu.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-danaMed mb-1">GPU</label>
                  <input
                    {...register("gpu", {
                      required: "کارت گرافیک الزامی است",
                      pattern: {
                        value: /^(RTX|GTX|Radeon)\s?[A-Za-z0-9\s\-]{2,30}$/i,
                        message:
                          "فرمت GPU معتبر نیست (مثلاً RTX 4060 یا Radeon RX 6800M)",
                      },
                    })}
                    type="text"
                    placeholder="RTX 4060"
                    className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                  {errors.gpu && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.gpu.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              عکس های محصول
            </label>
            <input
              type="file"
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default FormContainer;
