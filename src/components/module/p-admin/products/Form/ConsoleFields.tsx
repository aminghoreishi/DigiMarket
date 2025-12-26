import React from "react";

function ConsoleFields({ register, errors }: { register: any; errors: any }) {
  return (
    <div className="p-6 bg-purple-50 lg:col-span-3 font-danaMed rounded-xl border border-purple-200">
      <h3 className="text-lg font-danaBold mb-4 text-purple-800">
        مشخصات کنسول بازی
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-sm mb-1">برند</label>
          <input
            {...register("brand", { required: "برند الزامی است" })}
            type="text"
            placeholder="Sony / Microsoft / Nintendo"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-2">{errors.brand.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">مدل</label>
          <input
            {...register("model", { required: "مدل الزامی است" })}
            type="text"
            placeholder="PlayStation 5"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          />
          {errors.model && (
            <p className="text-red-500 text-xs mt-2">{errors.model.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">ظرفیت حافظه (GB)</label>
          <select
            {...register("storage", { required: "حافظه الزامی است" })}
            className="border-2 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          >
            <option value="">انتخاب حافظه</option>
            <option value="256">256</option>
            <option value="512">512</option>
            <option value="825">825</option>
            <option value="1024">1024</option>
          </select>
          {errors.storage && (
            <p className="text-red-500 text-xs mt-2">
              {errors.storage.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">نوع پردازنده</label>
          <input
            {...register("cpu", { required: "پردازنده الزامی است" })}
            type="text"
            placeholder="AMD Zen 2"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          />
          {errors.cpu && (
            <p className="text-red-500 text-xs mt-2">{errors.cpu.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">پردازنده گرافیکی</label>
          <input
            {...register("gpu", { required: "پردازنده گرافیکی الزامی است" })}
            type="text"
            placeholder="AMD RDNA 2"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          />
          {errors.gpu && (
            <p className="text-red-500 text-xs mt-2">{errors.gpu.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">رزولوشن خروجی</label>
          <select
            {...register("resolution", {
              required: "رزولوشن الزامی است",
            })}
            className="border-2 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          >
            <option value="">انتخاب رزولوشن</option>
            <option value="1080p">1080p</option>
            <option value="1440p">1440p</option>
            <option value="4k">4K</option>
            <option value="8k">8K</option>
          </select>
          {errors.resolution && (
            <p className="text-red-500 text-xs mt-2">
              {errors.resolution.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">حداکثر فریم‌ریت (FPS)</label>
          <select
            {...register("fps", { required: "فریم‌ریت الزامی است" })}
            className="border-2 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          >
            <option value="">انتخاب فریم‌ریت</option>
            <option value="60">60</option>
            <option value="120">120</option>
          </select>
          {errors.fps && (
            <p className="text-red-500 text-xs mt-2">{errors.fps.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">نوع دیسک</label>
          <select
            {...register("discType", { required: "نوع دیسک الزامی است" })}
            className="border-2 rounded-xl px-3 py-2 text-xs border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          >
            <option value="">انتخاب نوع</option>
            <option value="Blu-ray">Blu-ray</option>
            <option value="Digital">دیجیتال (بدون دیسک)</option>
          </select>
          {errors.discType && (
            <p className="text-red-500 text-xs mt-2">
              {errors.discType.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">اقلام داخل جعبه</label>
          <input
            {...register("inBox", {
              required: "اقلام داخل جعبه الزامی است",
            })}
            type="text"
            placeholder="دسته، کابل HDMI، کابل برق"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 mt-2 focus:ring-2 focus:ring-purple-500 outline-0"
          />
          {errors.inBox && (
            <p className="text-red-500 text-xs mt-2">{errors.inBox.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConsoleFields;
