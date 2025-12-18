import FormContainer from "@/components/module/p-admin/products/Form/FormContainer";
import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import db from "@/config/db";
import categoryModel from "@/models/category";
import { memo } from "react";

async function page() {
  await db();

  const categories = await categoryModel
    .find({})
    .populate("subCategory")
    .lean();
  return (
    <>
      <TopBarMemo />
      <div className="mt-8">
        <FormContainer categories={JSON.parse(JSON.stringify(categories))} />
      </div>
    </>
  );
}

const TopBarMemo = memo(() => {
  return <TopBar title="ایجاد محصول" />;
});

export default page;
