import db from "@/config/db";
import PopProductCom from "./PopProductCom";
import productModel from "@/models/product";

async function PopProductContainer() {
  await db()

  const products = await productModel.find().sort({ sales: -1 }).limit(8).exec();
  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-center">
        <h2 className="font-danaMed text-lg">پرفروش ترین محصولات</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 divide-y-2 divide-zinc-200">
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
        <PopProductCom />
      </div>
    </div>
  );
}

export default PopProductContainer;
