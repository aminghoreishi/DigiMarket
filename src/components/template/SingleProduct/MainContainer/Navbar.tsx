"use client";

import React, { memo } from "react";

const Navbar : React.FC = memo(() => {
  const scrollToComment = () => {
    window.scrollTo({
      top: 1200,
      behavior: "smooth",
    });
  };

  return (
    <ul className="flex max-sm:gap-3 max-sm:text-xs gap-8 border-b-2 border-b-zinc-200 pb-4 mt-8 text-gray-600 font-danaMed cursor-pointer">
      <li>توضیحات</li>
      <li>مشخصات</li>
      <li onClick={scrollToComment}>دیدگاه</li>
      <li>پرسش ها</li>
    </ul>
  );
});

export default Navbar;
