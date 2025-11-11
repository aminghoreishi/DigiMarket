"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormData {
  title: string;
  href: string;
  img: FileList;
  category: string;
}

function Page() {
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({ mode: "all" });

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

   
    if (file) {
      setValue("img", e.target.files as any, { shouldValidate: true });
    } else {
      setValue("img", { length: 0 } as any, { shouldValidate: true });
    }
  };

 
  const onSubmit = async (data: FormData) => {
    if (!selectedFile) {
      Swal.fire({
        title: "لطفاً عکس را انتخاب کنید",
        icon: "warning",
        timer: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("href", data.href);
    formData.append("category", data.category);
    formData.append("img", selectedFile, selectedFile.name);

    try {
      setLoading(true);
      const response = await fetch("/api/subCategory", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "زیر دسته بندی با موفقیت ایجاد شد",
          icon: "success",
          timer: 2000,
        });

      
        reset();
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const error = await response.json();
        Swal.fire({
          title: "خطا",
          text: error.message || "خطا در ایجاد زیر دسته بندی",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "خطا در ارتباط با سرور",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-danaMed  ">
      <h1 className="text-2xl font-bold mb-6">ایجاد زیر دسته بندی</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نام زیر دسته بندی
            </label>
            <input
              {...register("title", {
                required: "نام زیر دسته بندی الزامی است",
                pattern: {
                  value: /^[\u0600-\u06FFa-zA-Z0-9\s]{2,50}$/,
                  message: "نام باید بین 2 تا 50 کاراکتر باشد",
                },
              })}
              className="border-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200"
              type="text"
              placeholder="مثلاً: گوشی آیفون"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              لینک دسته بندی
            </label>
            <input
              {...register("href", {
                required: "لینک الزامی است",
                pattern: {
                  value: /^(?:\/)?[a-z0-9]+(?:[-\/][a-z0-9]+)*$/,
                  message: "لینک باید فقط شامل حروف کوچک، اعداد، خط تیره و / باشد",
                },
              })}
              className="border-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200"
              type="text"
              placeholder="مثلاً: /iphone"
            />
            {errors.href && (
              <p className="text-red-500 text-xs mt-1">{errors.href.message}</p>
            )}
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عکس زیردسته بندی
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="border-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.img && (
              <p className="text-red-500 text-xs mt-1">{errors.img.message}</p>
            )}
            {selectedFile && (
              <p className="text-green-600 text-xs mt-1">
                انتخاب شده: {selectedFile.name}
              </p>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              دسته بندی
            </label>
            <select
              {...register("category", {
                required: "انتخاب دسته بندی الزامی است",
              })}
              className="border-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200"
            >
              <option value="">دسته بندی را انتخاب کنید</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

       
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-lg font-danaMed text-sm transition-all"
          >
            {loading ? "در حال ایجاد..." : "ایجاد زیر دسته بندی"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;