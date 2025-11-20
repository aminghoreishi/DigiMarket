import Table from "@/components/module/p-admin/Table/Table";
import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import categoryModel from "@/models/category";
import Link from "next/link";

async function page() {
  const categories = await categoryModel.find({}).lean();

  console.log(categories);

  return (
    <div>
      <TopBar title="دسته بندی ها" />

      <div>
        <div className="flex w-full  justify-end">
          <Link href={"/admin/categories/create"} >
          <button className="px-4 py-2 bg-blue-500 transition-all cursor-pointer hover:bg-blue-600 text-white rounded-md mt-4 font-danaMed text-xs">ایجاد دسته بندی جدید</button>
          </Link>
        </div>
        <Table
          headers={["نام دسته بندی", "لینک", "عملیات"]}
          content={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </div>
  );
}

export default page;
