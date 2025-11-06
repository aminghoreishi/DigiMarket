"use client";
import { useForm, useWatch } from "react-hook-form";
import ColorSelector from "./ColorSelector";
import LaptopFields from "./LaptopFields";
import SmartwatchFields from "./SmartwatchFields";

function FormContainer({ categories }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });

  const watchedCategory = useWatch({
    control,
    name: "category",
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
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
                <option key={category._id} value={category._id}>
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
          {watchedCategory === "690a2fb904b179efa1860b12" && (
            <LaptopFields register={register} errors={errors} />
          )}
          {watchedCategory === "690b39962d29378e5b3d6194" && (
            <SmartwatchFields register={register} errors={errors} />
          )}

          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              عکس‌های محصول
            </label>

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              {...register("images", {
                required: "انتخاب حداقل یک تصویر الزامی است",
                validate: {
                  fileType: (files) => {
                    if (!files || files.length === 0)
                      return "لطفاً حداقل یک عکس انتخاب کنید";
                    const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ];
                    for (const file of files) {
                      if (!validTypes.includes(file.type)) {
                        return "فرمت تصویر باید PNG، JPG یا WEBP باشد";
                      }
                    }
                    return true;
                  },
                  fileName: (files) => {
                    const regex = /\.(jpg|jpeg|png|webp)$/i;
                    for (const file of files) {
                      if (!regex.test(file.name)) {
                        return "نام فایل باید با پسوند jpg، jpeg، png یا webp تمام شود";
                      }
                    }
                    return true;
                  },
                  fileSize: (files) => {
                    for (const file of files) {
                      if (file.size > 2 * 1024 * 1024) {
                        // ۲ مگابایت
                        return "حجم هر تصویر نباید بیشتر از ۲ مگابایت باشد";
                      }
                    }
                    return true;
                  },
                },
              })}
              className={`border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm ${
                errors.images ? "border-red-400" : ""
              }`}
            />

            {errors.images && (
              <p className="text-red-500 text-xs mt-2">
                {errors.images.message}
              </p>
            )}
          </div>
          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              توضیح کوتاه برای محصول
            </label>
            <input
              type="text"
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
          </div>

          <ColorSelector
            register={register}
            setValue={setValue}
            errors={errors}
          />

          <div className="font-danaMed flex flex-col lg:col-span-3">
            <label className="text-sm" htmlFor="">
              توضیحات طولانی برای محصول
            </label>
            <textarea className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"></textarea>
          </div>
        </div>

        <div className="mt-5 font-danaMed text-sm">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-xl cursor-pointer transition-all hover:bg-blue-600 "
          >
            ایجاد محصول
          </button>
        </div>
      </form>
    </div>
  );
}
export default FormContainer;
