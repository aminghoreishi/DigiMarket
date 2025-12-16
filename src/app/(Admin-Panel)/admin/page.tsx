import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Information from "@/components/template/p-admin/Home/Information";
import OrderTable from "@/components/template/p-admin/Home/Order/OrderTable";
import ShowProduct from "@/components/template/p-admin/Home/ShowNewPro/ShowProduct";

import db from "@/config/db";
import orderModel from "@/models/order";
import productModel from "@/models/product";
import userModel from "@/models/user";

import { memo } from "react";

/* =======================
   Server Component
======================= */
async function Page() {
  await db();

  const productsCount = await productModel.countDocuments({});
  const usersCount = await userModel.countDocuments({});
  const ordersCount = await orderModel.countDocuments({});
  const deliveredOrdersCount = await orderModel.countDocuments({
    status: "delivered",
  });

  const allOrders = await orderModel
    .find({})
    .limit(3)
    .populate([
      { path: "user" },
      { path: "products.product", select: "title price name" },
    ])
    .lean();

  const allProducts = await productModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <div>
      <TopBarMemo />
      <PageMemo
        productsCount={productsCount}
        usersCount={usersCount}
        ordersCount={ordersCount}
        deliveredOrdersCount={deliveredOrdersCount}
        allOrders={allOrders}
        allProducts={allProducts}
      />
    </div>
  );
}

type PageMemoProps = {
  productsCount: number;
  usersCount: number;
  ordersCount: number;
  deliveredOrdersCount: number;
  allOrders: any[];
  allProducts: any[];
};

const PageMemo = memo(
  ({
    productsCount,
    usersCount,
    ordersCount,
    deliveredOrdersCount,
    allOrders,
    allProducts,
  }: PageMemoProps) => {
    return (
      <>
        <div>
          <Information
            productsCount={productsCount}
            usersCount={usersCount}
            ordersCount={ordersCount}
            deliveredOrdersCount={deliveredOrdersCount}
          />
        </div>

        <div className="mt-10">
          <OrderTable
            isReload={true}
            orders={JSON.parse(JSON.stringify(allOrders))}
          />
        </div>

        <div className="mt-10">
          <ShowProduct products={JSON.parse(JSON.stringify(allProducts))} />
        </div>
      </>
    );
  }
);

const TopBarMemo = memo(() => {
  return <TopBar title="صفحه اصلی" />;
});

export default Page;
