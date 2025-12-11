import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import OrderTable from "@/components/template/p-admin/Order/OrderTable";
import db from "@/config/db";
import orderModel from "@/models/order";
import React from "react";

async function page() {
  await db();
  const orders = await orderModel
    .find()
    .sort({ createdAt: -1 })
    .populate("user")
    .skip(0)
    .limit(8)
    .lean();

      const totalOrder= await orderModel.countDocuments({});
      const totalPages = Math.ceil(totalOrder / 4);

  console.log(orders);

  return (
    <div>
      <TopBar title="سفارشات" />

      <div className="mt-8">
        <OrderTable orders={JSON.parse(JSON.stringify(orders))} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
