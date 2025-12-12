"use client";

import { useEffect, useState } from "react";

function FormBrand() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  return (
    <div className="mt-4">
      <form onSub>
        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-3">
          <div>
            <div className="font-danaMed flex flex-col lg:col-span-3">
              <label className="text-sm" htmlFor="">
                نام برند
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <div className="font-danaMed flex flex-col lg:col-span-3">
              <label className="text-sm" htmlFor="">
                عکس برند
              </label>
              <input
                type="file"
                onChange={(e) => setImg(e.target.value)}
                className="border-2 outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl mt-2 border-zinc-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <button className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg text-sm">
            ثبت برند
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormBrand;
