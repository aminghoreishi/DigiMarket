import OffForm from "@/components/module/p-admin/offs/OffForm";
import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import React from "react";

async function page() {
  await db();

  const subCat = await subCategoryModel.find().lean();

  return (
    <div>
      <TopBar title="تخفیفات" />

      <div className="mt-5">
        <div>
          <OffForm subCategories={JSON.parse(JSON.stringify(subCat))} />
        </div>
      </div>
    </div>
  );
}

export default page;
