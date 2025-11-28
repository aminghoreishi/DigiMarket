"use client";
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
function SearchBar() {
  const [value, setValue] = useState("");

  const router = useRouter();

  const searchProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${value}`);
    }
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={searchProduct}
        type="text"
        className="border-2 font-danaMed border-gray-300 rounded-lg  outline-0 p-2 text-sm w-[400px]"
        placeholder="جستجوی محصول"
      />
      <div className="absolute top-2.5 left-2">
        <button>
          <IoIosSearch size={20} color="red" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
