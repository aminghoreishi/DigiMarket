import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import SearchBar from "@/components/template/p-admin/product/SearchBar";
import Table from "@/components/template/p-admin/product/Table";
import productModel from "@/models/product";
import Link from "next/link";

async function page() {
  const products = await productModel
    .find({})
    .populate("category", "subCategory")
    .limit(4)
    .skip(0)
    .lean();

  const totalProducts = await productModel.countDocuments({});
  const totalPages = Math.ceil(totalProducts / 4);

  return (
    <div>
      <TopBar title="محصولات" />

      <div dir="rtl">
        <div className="mt-5">
          <SearchBar />
        </div>
        <div className="flex justify-end">
          <Link href="/admin/products/createProduct">
            <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">
              ایجاد محصول جدید
            </button>
          </Link>
        </div>
        <Table
          products={JSON.parse(JSON.stringify(products))}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default page;
