import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperRel from "./SwiperRel";
import db from "@/config/db";
import productModel from "@/models/product";
import { Types } from "mongoose";

async function RelatedPro({
  tags,
  findProductID,
}: {
  tags: { _id: string; name: string }[];
  findProductID: any;
}) {
  console.log(tags);

  await db();

  const tagNames = tags.map((t) => t);

  const relatedProducts = await productModel
    .find({
      tags: { $in: tagNames }, // هر محصولی که یکی از این تگ‌ها رو داشته باشه
      _id: { $ne: findProductID }, // خودش نیاد
    })
    .limit(6)
    .lean();

  console.log(relatedProducts);

  return (
    <div className="my-8">
      <TopSubject title="محصولات مرتبط" />
      <SwiperRel products={JSON.parse(JSON.stringify(relatedProducts))} />
    </div>
  );
}

export default RelatedPro;
