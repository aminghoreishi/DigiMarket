"use client";

import { memo, useEffect, useRef, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
const SearchBar = memo(
  ({ removeProduct }: { removeProduct?: (id: string) => Promise<void> }) => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          searchRef.current &&
          !(searchRef.current as any).contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (query.trim() === "") {
        setResult([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      setIsOpen(true);

      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/product/search?query=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          setResult(data);
        } catch (error) {
      
          setResult([]);
        } finally {
          setIsLoading(false);
        }
      };

      const delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
      <div className="w-full relative" ref={searchRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی محصول..."
          className="border-2 border-zinc-200 outline-0 px-3 py-2 rounded-xl text-xs w-full"
        />
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden z-50">
            <div key="dropdown-wrapper" className="py-2">
              {isLoading && (
                <div className="px-4 py-3 text-center text-sm text-zinc-500">
                  در حال جستجو...
                </div>
              )}

              {!isLoading && result.length === 0 && (
                <div className="px-4 py-3 text-center text-sm text-zinc-500">
                  هیچ محصولی یافت نشد
                </div>
              )}

              {!isLoading &&
                result.length > 0 &&
                result.map((item: any) => (
                  <div
                    key={item._id || item.id || item.name}
                    className="px-4 py-3 hover:bg-zinc-50 cursor-pointer transition-colors border-b border-zinc-100 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <div className="">
                        <div className="font-danaMed text-sm">{item.name}</div>
                        {item.price && (
                          <div className="text-xs text-zinc-500 mt-1">
                            {Number(item.price).toLocaleString("fa-IR")} تومان
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <div>
                          <FaRegTrashCan
                            className="text-red-500"
                            onClick={() =>
                              removeProduct && removeProduct(item._id)
                            }
                          />
                        </div>
                        <div>
                          <MdEdit className="text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default SearchBar;
