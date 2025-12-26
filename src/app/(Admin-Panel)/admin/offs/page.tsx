import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import offsModel from "@/models/offs";
import OffContainer from "@/components/module/p-admin/offs/OffContainer";
async function page() {
  await db();

  const subCat = await subCategoryModel.find().select("title _id").lean();

  const offs = await offsModel.find({}, "-__v -updatedAt").limit(7).lean();

  const totalOffs = await offsModel.countDocuments({});
  const totalPages = Math.ceil(totalOffs / 7);
  return (
    <div>
      <TopBar title="تخفیفات"  isPanelUser={false} />

      <div className="mt-5">
        <OffContainer
          offs={JSON.parse(JSON.stringify(offs))}
          totalPages={totalPages}
          subCat={JSON.parse(JSON.stringify(subCat))}
        />
      </div>
    </div>
  );
}

export default page;
