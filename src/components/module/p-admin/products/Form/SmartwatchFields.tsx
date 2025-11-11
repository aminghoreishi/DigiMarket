import React from "react";

function SmartwatchFields({ register, errors }) {
  return (
    <div className="p-6 bg-blue-50 lg:col-span-3 font-danaMed rounded-xl border border-blue-200">
      <h3 className="text-lg font-danaBold mb-4 text-blue-800">
        مشخصات ساعت هوشمند
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* RAM */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">رم (GB)</label>
          <select
            {...register("ram", { required: "مقدار رم الزامی است" })}
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
          >
            <option value="">انتخاب رم</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          {errors.ram && (
            <p className="text-red-500 text-xs mt-2">{errors.ram.message}</p>
          )}
        </div>

        {/* Storage */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">حافظه (GB)</label>
          <select
            {...register("storage", { required: "حافظه الزامی است" })}
            dir="rtl"
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
          >
            <option value="">انتخاب حافظه</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
          {errors.storage && (
            <p className="text-red-500 text-xs mt-2">
              {errors.storage.message}
            </p>
          )}
        </div>

        {/* Screen Size */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">سایز صفحه (اینچ)</label>
          <input
            {...register("screenSize", {
              required: "سایز صفحه الزامی است",
              pattern: {
                value: /^(?:\d{1}(?:\.\d{1,2})?)$/,
                message:
                  "سایز صفحه باید عددی بین 1 تا 9 و حداکثر با دو رقم اعشار باشد",
              },
              validate: (value) => {
                const num = parseFloat(value);
                if (num < 1 || num > 9)
                  return "سایز صفحه باید بین 1 تا 9 اینچ باشد";
                return true;
              },
            })}
            type="text"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
            placeholder="1.9"
          />
          {errors.screenSize && (
            <p className="text-red-500 text-xs mt-2">
              {errors.screenSize.message}
            </p>
          )}
        </div>

        {/* Chipset */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">چیپست</label>
          <input
            {...register("chipset", {
              required: "چیپست الزامی است",
              pattern: {
                value: /^[A-Za-z0-9\s\+\-]+$/,
                message: "چیپست باید فقط شامل حروف، اعداد و + یا - باشد",
              },
            })}
            type="text"
            placeholder="Snapdragon W5+ Gen 1"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
          />
          {errors.chipset && (
            <p className="text-red-500 text-xs mt-2">
              {errors.chipset.message}
            </p>
          )}
        </div>

        {/* Operating System */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">سیستم‌عامل</label>
          <input
            {...register("os", {
              required: "سیستم‌عامل الزامی است",
              pattern: {
                value:
                  /^(Wear OS|watchOS|HarmonyOS|MIUI Watch OS|RTOS|Android)$/i,
                message:
                  "سیستم‌عامل معتبر نیست (مثلاً Wear OS، watchOS یا HarmonyOS)",
              },
            })}
            type="text"
            placeholder="Wear OS"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
          />
          {errors.os && (
            <p className="text-red-500 text-xs mt-2">{errors.os.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">وزن (گرم)</label>
          <input
            {...register("weight", {
              required: "وزن الزامی است",
              pattern: {
                value: /^\d{1,3}(\.\d{1,2})?$/,
                message: "وزن باید عددی معتبر باشد (مثلاً 45 یا 32.5)",
              },
              validate: (value ) => {
                const num = parseFloat(value);
                if (num < 5) return "وزن نمی‌تواند کمتر از ۵ گرم باشد";
                if (num > 500) return "وزن نمی‌تواند بیشتر از ۵۰۰ گرم باشد";
                return true;
              },
            })}
            type="text"
            placeholder="45"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-2">{errors.weight.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SmartwatchFields;
