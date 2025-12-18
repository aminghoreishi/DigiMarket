import React from "react";

function ModemFields({ register, errors }) {
  return (
    <div className="p-6 bg-blue-50 lg:col-span-3 font-danaMed rounded-xl border border-blue-200">
      <h3 className="text-lg font-danaBold mb-4 text-blue-800">مشخصات مودم</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">تعداد انتن</label>
          <select
            {...register("anten", { required: "تعداد انتن الزامی است" })}
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
          >
            <option value="">تعداد انتن</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          {errors.anten && (
            <p className="text-red-500 text-xs mt-2">{errors.anten.message}</p>
          )}
        </div>

        {/* Storage */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">
            تعداد پورت اترنت RJ-45
          </label>
          <select
            {...register("rj45", { required: "تعداد پورت اترنت الزامی است" })}
            dir="rtl"
            className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-xs"
          >
            <option value="">انتخاب تعداد پورت</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
          </select>
          {errors.rj45 && (
            <p className="text-red-500 text-xs mt-2">{errors.rj45.message}</p>
          )}
        </div>

        {/* Screen Size */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">نوع آنتن</label>
          <input
            {...register("kindAnten", {
              required: "نوع آنتن الزامی است",
              pattern: {
                // value: /^(?:\d{1}(?:\.\d{1,2})?)$/,
                // message:
                //   "نوع آنتن باید عددی بین 1 تا 9 و حداکثر با دو رقم اعشار باشد",
              },
              validate: (value) => {
                // const num = parseFloat(value);
                // if (num < 1 || num > 9)
                //   return "نوع آنتن باید بین 1 تا 9 باشد";
                // return true;
              },
            })}
            type="text"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
            placeholder="1.9"
          />
          {errors.kindAnten && (
            <p className="text-red-500 text-xs mt-2">
              {errors.kindAnten.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">نوع شبکه</label>
          <input
            {...register("networkType", {
              required: "نوع شبکه الزامی است",
            
            })}
            type="text"
            placeholder="2.4GHz & 5GHz"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
          />
          {errors.networkType && (
            <p className="text-red-500 text-xs mt-2">
              {errors.networkType.message}
            </p>
          )}
        </div>

        {/* Operating System */}
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">
            فرکانس قابل پشتیبانی
          </label>
          <input
            {...register("fer", {
              required: "فرکانس قابل پشتیبانی الزامی است",
              //   pattern: {
              //     value:
              //       /^(Wear OS|watchOS|HarmonyOS|MIUI Watch OS|RTOS|Android)$/i,
              //     message:
              //       "سیستم‌عامل معتبر نیست (مثلاً Wear OS، watchOS یا HarmonyOS)",
              //   },
            })}
            type="text"
            placeholder="2.4GHz & 5GHz"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
          />
          {errors.fer && (
            <p className="text-red-500 text-xs mt-2">{errors.fer.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">کلیدها</label>
          <input
            {...register("keys", {
              required: "کلیدها الزامی است",
              //   pattern: {
              //     value:
              //       /^(Wear OS|watchOS|HarmonyOS|MIUI Watch OS|RTOS|Android)$/i,
              //     message:
              //       "سیستم‌عامل معتبر نیست (مثلاً Wear OS، watchOS یا HarmonyOS)",
              //   },
            })}
            type="text"
            placeholder="WPS, Reset"
            className="border-2 rounded-xl px-3 py-2 text-sm border-zinc-200 outline-0 transition-all focus:ring-2 focus:ring-blue-500 mt-2"
          />
          {errors.keys && (
            <p className="text-red-500 text-xs mt-2">{errors.keys.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-danaMed mb-1">وزن (گرم)</label>
          <input
            {...register("weight", {
              required: "وزن الزامی است",
        
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

export default ModemFields;
