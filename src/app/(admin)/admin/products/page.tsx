import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Table from "@/components/template/p-admin/product/Table";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <TopBar title="محصولات" />

      <div>
        <div className="flex justify-end">
          <Link href="/admin/products/createProduct">
            <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">
              ایجاد محصول جدید
            </button>
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
}

export default page;
