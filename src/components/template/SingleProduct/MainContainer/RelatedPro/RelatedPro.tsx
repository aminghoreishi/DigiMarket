import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperRel from "./SwiperRel";
import db from "@/config/db";
import productModel from "@/models/product";

async function RelatedPro({
  tags,
  findProductID,
}: {
  tags: { _id: string; name: string }[];
  findProductID: any;
}) {
  await db();

  const tagNames = tags.map((t) => t);

  const relatedProducts = await productModel
    .find({
      tags: { $in: tagNames },
      _id: { $ne: findProductID },
    })
    .limit(6)
    .lean();

  return (
    <div className="my-8">
      <TopSubject title="محصولات مرتبط" />
      <SwiperRel products={JSON.parse(JSON.stringify(relatedProducts))} />
    </div>
  );
}

export default RelatedPro;
