import TopSubject from "@/components/module/TopSubject/TopSubject";
import SwiperPop from "../popProduct/SwiperPop";
import db from "@/config/db";
import productModel from "@/models/product";

async function NewProduct() {
  await db();

  const products = await productModel
    .find()
    .sort({ createdAt: -1 })
    .select("title images price colors name")
    .limit(8);
  return (
    <div className="mt-12">
      <TopSubject title="جدید ترین محصولات" />
      <SwiperPop products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}

export default NewProduct;
