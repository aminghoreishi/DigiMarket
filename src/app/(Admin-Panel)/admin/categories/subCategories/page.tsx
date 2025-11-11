import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import subCategoryModel from "@/models/subCategory";
import SubCategoryTable from "@/components/template/p-admin/category/subCategory/subCategoryTable";
import Link from "next/link";
import categoryModel from "@/models/category";
async function page() {
  const subCat = await subCategoryModel.find({}).populate("category").lean();

  console.log(subCat);

  return (
    <div>
      <TopBar title="زیر دسته بندی ها" />

      <div className="mt-4 flex justify-end">
        <Link href="/admin/categories/subCategories/createSub">
          <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">
            ایجاد زیر دسته بندی
          </button>
        </Link>
      </div>

      <div>
        <SubCategoryTable data={JSON.parse(JSON.stringify(subCat))} />
      </div>
    </div>
  );
}

export default page;
