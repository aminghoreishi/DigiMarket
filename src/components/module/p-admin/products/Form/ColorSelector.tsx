"use client";

import React, { useState, MouseEvent, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface FormValues {
  colors?: string[]; //* it can undefined or null
}

interface ColorSelectorProps {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  register,
  setValue,
}) => {
  const [color, setColor] = useState("");
  const [colorArray, setColorArray] = useState<string[]>([]);

  useEffect(() => {
    setValue("colors", colorArray, { shouldValidate: true });
  }, [colorArray]);

  const addColor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (color.trim() && !colorArray.includes(color.trim())) {
      setColorArray((prev) => [...prev, color.trim()]);
      setColor("");
    }
  };

  const removeColor = (title: string) => {
    setColorArray((prev) => prev.filter((c) => c !== title));
  };

  return (
    <div className="flex flex-col font-danaMed text-sm">
      <label>رنگ</label>
      <div className="relative mt-2">
        <input
          type="text"
          value={color}
          placeholder="مشکی"
          {...register("colors", { shouldUnregister: true })}
          onChange={(e) => setColor(e.target.value)}
          className="border-2 w-full outline-0 transition-all focus:ring-2 focus:ring-blue-500 rounded-xl border-zinc-200 px-3 py-2 pl-16 text-sm"
        />
        <button
          onClick={addColor}
          className="absolute left-0 top-0 h-full bg-blue-500 text-white px-4 rounded-l-xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
        >
          افزودن
        </button>
      </div>

      {colorArray.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {colorArray.map((c, index) => (
            <div
              key={index}
              className="bg-blue-100 flex items-center text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
              onClick={() => removeColor(c)}
            >
              <span className="ml-1">{c}</span>
              <IoIosClose size={18} className="text-red-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;
