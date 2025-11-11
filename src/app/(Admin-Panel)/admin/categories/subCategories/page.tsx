import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import subCategoryModel from "@/models/subCategory";
import SubCategoryTable from "@/components/template/p-admin/category/subCategory/subCategoryTable";
async function page() {
  const subCat = await subCategoryModel.find({}).populate("category").lean();

  console.log(subCat);

  return (
    <div>
      <TopBar title="زیر دسته بندی ها" />

      <div>
        <SubCategoryTable data={JSON.parse(JSON.stringify(subCat))} />
      </div>
    </div>
  );
}

export default page;
