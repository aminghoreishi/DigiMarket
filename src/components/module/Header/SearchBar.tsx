"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("");
    setIsFocused(false);
  }, [pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      router.push(`/search?query=${encodeURIComponent(value.trim())}`);
      setIsFocused(false);
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <>
      {isFocused && (
        <div
          className="fixed inset-0 top-18 bg-black/50 z-40"
          onClick={() => setIsFocused(false)}
        />
      )}

      <div className="relative w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="جستجوی محصول..."
          className="w-full rounded-xl border-2 border-gray-300 bg-white py-3 pl-12 pr-5 text-sm font-danaMed outline-none transition-all focus:border-red-500 focus:shadow-lg"
        />

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <IoIosSearch size={22} className="text-gray-500" />
        </div>

        {isFocused && (
          <div className="absolute left-0 top-full mt-2 w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden">
            <div className="max-h-96 overflow-y-auto py-3">
              {["آیفون ۱۵", "لپ تاپ گیمینگ", "هدفون سونی", "ساعت اپل"].map(
                (item) => (
                  <div
                    key={item}
                    onClick={() => {
                      router.push(`/search?query=${encodeURIComponent(item)}`);
                      setIsFocused(false);
                    }}
                    className="cursor-pointer px-6 py-3 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <IoIosSearch className="text-gray-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
