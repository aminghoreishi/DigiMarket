import React from "react";
import { IoIosSearch } from "react-icons/io";
function SearchBar() {
  return (
    <div className="relative">
      <input
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
