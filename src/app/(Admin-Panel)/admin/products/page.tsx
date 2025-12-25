import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Table from "@/components/template/p-admin/product/Table";

import db from "@/config/db";
import orderModel from "@/models/order";
import productModel from "@/models/product";

import { memo } from "react";

async function Page() {
  await db();

  const product = await productModel
    .find({}, "-__v")
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(8)
    .lean();

  const totalProduct = await orderModel.countDocuments({});
  const totalPages = Math.ceil(totalProduct / 8);

  return (
    <div>
      <TopBarMemo />
      <PageMemo product={product} totalPages={totalPages} />
    </div>
  );
}

type PageMemoProps = {
  product: any[];
  totalPages: number;
};

const PageMemo = memo(({ product, totalPages }: PageMemoProps) => {
  return (
    <>
      <div className="mt-8">
        <Table
          products={JSON.parse(JSON.stringify(product))}
          totalPages={totalPages}
        />
      </div>
    </>
  );
});

const TopBarMemo = memo(() => {
  return <TopBar title="سفارشات" />;
});

export default Page;
