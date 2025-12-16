import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import OrderTable from "@/components/template/p-admin/Order/OrderTable";

import db from "@/config/db";
import orderModel from "@/models/order";

import { memo } from "react";

/* =======================
   Server Component
======================= */
async function Page() {
  await db();

  const orders = await orderModel
    .find({})
    .sort({ createdAt: -1 })
    .populate([
      { path: "user" },
      { path: "products.product", select: "title price name" },
    ])
    .skip(0)
    .limit(8)
    .lean();

  const totalOrders = await orderModel.countDocuments({});
  const totalPages = Math.ceil(totalOrders / 4);

  return (
    <div>
      <TopBarMemo />
      <PageMemo
        orders={orders}
        totalPages={totalPages}
      />
    </div>
  );
}

/* =======================
   Page Content
======================= */
type PageMemoProps = {
  orders: any[];
  totalPages: number;
};

const PageMemo = memo(({ orders, totalPages }: PageMemoProps) => {
  return (
    <>
      <div className="mt-8">
        <OrderTable
          orders={JSON.parse(JSON.stringify(orders))}
          totalPages={totalPages}
        />
      </div>
    </>
  );
});

/* =======================
   Top Bar
======================= */
const TopBarMemo = memo(() => {
  return <TopBar title="سفارشات" />;
});

export default Page;
