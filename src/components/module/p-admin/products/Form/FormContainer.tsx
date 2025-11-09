"use client";
import { useForm, useWatch } from "react-hook-form";
import ColorSelector from "./ColorSelector";
import LaptopFields from "./LaptopFields";
import SmartwatchFields from "./SmartwatchFields";
import { useState } from "react";

function FormContainer({ categories }) {
  const [rawPrice, setRawPrice] = useState<number>(0);
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

  const submitForm = async (data) => {
    const formData = new FormData();

    const laptopFeatures = {
      ram: data.ramLap,
      storage: data.storageLap,
      screenSize: data.screenSize,
      cpu: data.cpu,
      gpu: data.gpu,
      weight: data.weight,
    };

    const smartwatchFeatures = {
      ram: data.ram,
      storage: data.storage,
      screenSize: data.screenSize,
      chipset: data.chipset,
      os: data.os,
      weight: data.weight,
    };

    const selectedFeatures =
      data.category === "690a2fb904b179efa1860b12"
        ? laptopFeatures
        : data.category === "690b39962d29378e5b3d6194"
          ? smartwatchFeatures
          : {};

    const features = Object.entries(selectedFeatures)
      .filter(([_, value]) => value != null && value !== "")
      .map(([name, value]) => ({ name, value: value.toString() }));

    formData.append("title", data.title || "");
    formData.append("name", data.name || "");
    formData.append("price", rawPrice.toString());
    formData.append("count", data.count || "");
    formData.append("delivery", data.delivery || "");
    formData.append("category", data.category || "");
    formData.append("longDescription", data.longDescription || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("colors", JSON.stringify(data.colors || []));
    formData.append("features", JSON.stringify(features));

    if (data.images?.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    console.log("features:", features); 

    const res = await fetch("/api/product", {
      method: "POST",
      body: formData,
    });

    const response = await res.json();
    console.log("پاسخ:", response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline lg:grid-cols-3 gap-6">
          <div className="font-danaMed flex flex-col lg:col-span-3">
            <label className="text-sm" htmlFor="">
              نام محصول
            </label>
            <input
              type="text"
              {...register("title", {
                required: "نام محصول الزامی است",
                pattern: {
                  value: /^[\u0600-\u06FFA-Za-z0-9\s.,()\-_/:%+٪،‌–—]+$/,
                  message:
                    "عنوان باید بین ۳ تا ۲۰۰ کاراکتر و شامل حروف فارسی، انگلیسی یا عدد باشد",
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
          <div className="font-danaMed flex flex-col lg:col-span-3">
            <label className="text-sm" htmlFor="">
              اسم اصلی محصول
            </label>
            <input
              type="text"
              {...register("name", {
                required: "نام محصول الزامی است",
                pattern: {
                  value: /^[\u0600-\u06FFA-Za-z0-9\s.,()\-_/:%+٪،‌–—]+$/,
                  message:
                    "عنوان باید بین ۳ تا ۲۰۰ کاراکتر و شامل حروف فارسی، انگلیسی یا عدد باشد",
                },
              })}
              className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
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
                setRawPrice(+rawValue);
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
              placeholder="مثلاً لپ‌تاپ سبک و مناسب برای کار روزمره"
              {...register("shortDescription", {
                required: "توضیح کوتاه الزامی است",
                pattern: {
                  value: /^[\u0600-\u06FFA-Za-z0-9\s.,()\-_/:%+٪،‌–—]+$/,
                  message:
                    "توضیح باید بین ۱۰ تا ۱۲۰ کاراکتر و بدون کاراکتر غیرمجاز باشد",
                },
              })}
              className={`border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm ${
                errors.shortDescription ? "border-red-400" : ""
              }`}
            />
            {errors.shortDescription && (
              <p className="text-xs text-red-500 mt-1">
                {errors.shortDescription.message as string}
              </p>
            )}
          </div>

          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              مدت زمان ارسال (روز کاری)
            </label>
            <input
              type="text"
              placeholder="مثلاً 1 یا 3"
              {...register("delivery", {
                required: "مدت زمان ارسال الزامی است",
                pattern: {
                  value: /^[1-9][0-9]*$/,
                  message: "مدت ارسال باید عدد صحیح مثبت باشد",
                },
                validate: (value) => {
                  const num = Number(value);
                  if (num < 1) return "حداقل زمان ارسال ۱ روز کاری است";
                  if (num > 10) return "حداکثر زمان ارسال ۱۰ روز کاری است";
                  return true;
                },
              })}
              className={`border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm ${
                errors.delivery ? "border-red-400" : ""
              }`}
            />

            {errors.delivery && (
              <p className="text-xs text-red-500 mt-1">
                {errors.delivery.message as string}
              </p>
            )}
          </div>

          <ColorSelector
            register={register}
            setValue={setValue}
            errors={errors}
          />

          <div className="font-danaMed flex flex-col">
            <label className="text-sm" htmlFor="">
              مقدار
            </label>
            <input
              type="text"
              placeholder="مثلاً 5 یا 10"
              {...register("count", {
                required: "مقدار الزامی است",
                pattern: {
                  value: /^[1-9][0-9]*$/,
                  message: "مقدار باید عدد صحیح مثبت باشد",
                },
                validate: (value) => {
                  const num = Number(value);
                  if (num > 1000) return "حداکثر مقدار مجاز ۱۰۰۰ است";
                  return true;
                },
              })}
              className={`border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm ${
                errors.count ? "border-red-400" : ""
              }`}
            />
            {errors.count && (
              <p className="text-xs text-red-500 mt-1">
                {errors.count.message as string}
              </p>
            )}
          </div>

          <div className="font-danaMed flex flex-col lg:col-span-3">
            <label className="text-sm" htmlFor="">
              توضیحات طولانی برای محصول
            </label>

            <textarea
              placeholder="توضیحات کامل درباره ویژگی‌ها و مشخصات محصول..."
              {...register("longDescription", {
                required: "توضیحات محصول الزامی است",
               
              })}
              className={`border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm ${
                errors.longDescription ? "border-red-400" : ""
              }`}
            />

            {errors.longDescription && (
              <p className="text-xs text-red-500 mt-1">
                {errors.longDescription.message as string}
              </p>
            )}
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
