import FormContainer from "@/components/module/p-admin/products/Form/FormContainer";
import db from "@/config/db";
import categoryModel from "@/models/category";

async function page() {
  await db();

  const categories = await categoryModel
    .find({})
    .populate("subCategory")
    .lean();
  return (
    <div>
      <FormContainer categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}

export default page;
