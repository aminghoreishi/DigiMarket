import FormContainer from "@/components/module/p-admin/products/Form/FormContainer";
import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";

async function page() {
  await db();

  const categories = await subCategoryModel.find({}).lean();

  return (
    <div>
      <FormContainer categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}

export default page;
