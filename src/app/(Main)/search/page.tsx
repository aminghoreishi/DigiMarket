import Search from "@/components/template/search/search";
import React from "react";

function page() {
  return (
    <div className="container mx-auto font-danaMed">
      <h2 className="mt-12 text-2xl">نتیجه جستجو برای "لپ تاپ گیمینگ"</h2>

      <div className="mt-8">
        <Search />
      </div>
    </div>
  );
}

export default page;
