import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperPop from "./SwiperPop";
import db from "@/config/db";
import productModel from "@/models/product";
import { rateFunc } from "@/utils/rate";

async function PopProduct() {
  await db();

  const products = await productModel
    .find()
    .sort({ sales: -1 })
    .select("title images price colors name")
    .limit(8)
    .exec();

  const rate = await rateFunc(products);

  return (
    <div className="mt-12 container mx-auto">
      <TopSubject title="محصولات پرفروش" />
      <SwiperPop products={JSON.parse(JSON.stringify(products))} rate={rate} />
    </div>
  );
}

export default PopProduct;
