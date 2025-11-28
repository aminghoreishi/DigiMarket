import React from "react";

function Exits({}) {

    
    
  return (
    <div className="mt-5 border-2  border-zinc-200 rounded-xl p-2">
      <div className=" flex justify-between items-center ">
        <h2 className="text-sm font-medium p-3">موجود در انبار دیجی‌کالا</h2>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked />
            <div className="relative w-9 h-5 bg-neutral-quaternary rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500 dark:peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Exits;
