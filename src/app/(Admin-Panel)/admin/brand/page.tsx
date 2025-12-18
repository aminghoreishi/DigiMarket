import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import ContainerBrand from "@/components/template/p-admin/brand/ContainerBrand";
import db from "@/config/db";
import brandModel from "@/models/brand";
async function Page() {
  await db();

  const brands = await brandModel
    .find()
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(7)
    .lean();

  const totalBrands = await brandModel.countDocuments({});
  const totalPages = Math.ceil(totalBrands / 7);
  return (
    <div>
      <TopBar title="مدیریت برند ها" />

      <ContainerBrand
        brands={JSON.parse(JSON.stringify(brands))}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Page;
