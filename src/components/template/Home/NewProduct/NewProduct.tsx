import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperPop from "../popProduct/SwiperPop";
import db from "@/config/db";
import productModel from "@/models/product";
import { rateFunc } from "@/utils/rate";

async function NewProduct() {
  await db();

  const products = await productModel
    .find()
    .sort({ createdAt: -1 })
    .select("title images price colors name")
    .limit(6);

  const rate = await rateFunc(products);

  return (
    <div className="mt-12 container mx-auto">
      <TopSubject title="جدید ترین محصولات" />
      <SwiperPop products={JSON.parse(JSON.stringify(products))} rate={rate} />
    </div>
  );
}

export default NewProduct;