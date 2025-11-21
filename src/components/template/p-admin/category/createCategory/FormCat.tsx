"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormData = {
  title: string;
  href: string;
};

function FormCat() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(res);

    if (res.ok) {
      toast.success("دسته بندی با موفقیت ایجاد شد");
    }
  };

  return (
    <form className="font-danaMed" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="">نام دسته بندی</label>
          <input
            {...register("title")}
            type="text"
            className="border-2 mt-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200"
          />
        </div>
        <div>
          <label className="">لینک</label>
          <input
            {...register("href")}
            type="text"
            className="border-2 mt-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2 text-sm border-zinc-200"
          />
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">
            {isSubmitting ? "در حال ارسال..." : "ثبت دسته بندی"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormCat;
