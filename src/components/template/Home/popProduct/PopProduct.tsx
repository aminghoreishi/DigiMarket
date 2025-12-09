import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperPop from "./SwiperPop";
import db from "@/config/db";
import productModel from "@/models/product";

async function PopProduct() {
  await db();

  const products = await productModel
    .find()
    .sort({ sales: -1 })
    .select("title images price colors name")
    .limit(8)
    .exec();
  return (
    <div className="mt-12">
      <TopSubject title="محصولات پرفروش" />
      <SwiperPop products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}

export default PopProduct;
