import Table from "@/components/module/p-admin/Table/Table";
import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import categoryModel from "@/models/category";

async function page() {
  const categories = await categoryModel.find({}).lean();

  console.log(categories);

  return (
    <div>
      <TopBar title="دسته بندی ها" />

      <div>
        <Table
          headers={["نام دسته بندی", "لینک", "عملیات"]}
          content={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </div>
  );
}

export default page;
