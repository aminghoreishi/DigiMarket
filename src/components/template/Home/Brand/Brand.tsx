import TopSubject from "@/components/module/TopSubject/TopSubject";
import BrandSwiperContainer from "./BrandSwiperContainer";
import db from "@/config/db";
import brandModel from "@/models/brand";
import { BrandType } from "@/types/brand.type";

async function Brand() {
  await db();

  const brands = (await brandModel.find({})) as unknown as BrandType[];

  return (
    <div>
      <TopSubject title="برترین برند ها" />

      <BrandSwiperContainer brands={JSON.parse(JSON.stringify(brands))} />
    </div>
  );
}

export default Brand;
