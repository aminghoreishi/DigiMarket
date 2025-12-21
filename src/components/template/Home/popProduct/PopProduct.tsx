import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperPop from "./SwiperPop";
import db from "@/config/db";
import productModel from "@/models/product";
import commentModel from "@/models/comment";

async function PopProduct() {
  await db();

  const products = await productModel
    .find()
    .sort({ sales: -1 })
    .select("title images price colors name")
    .limit(8)
    .exec();

  const rate = await Promise.all(
    products.map(async (p: any) => {
      const comments = await commentModel
        .find({
          product: p._id,
          isApproved: true,
        })
        .lean();

      const totalCount = comments.length;

      if (totalCount === 0) {
        return {
          productId: p._id.toString(),
          rating: 0,
          ratingCount: 0,
        };
      }

      const positiveCount = comments.filter((c) => c.isOk).length;

      return {
        productId: p._id.toString(),
        rating: Number(((positiveCount / totalCount) * 5).toFixed(1)),
        ratingCount: totalCount,
      };
    })
  );

  return (
    <div className="mt-12 container mx-auto">
      <TopSubject title="محصولات پرفروش" />
      <SwiperPop products={JSON.parse(JSON.stringify(products))} rate={rate} />
    </div>
  );
}

export default PopProduct;
