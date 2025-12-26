import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Information from "@/components/template/p-admin/Home/Information";
import OrderTable from "@/components/template/p-admin/Home/Order/OrderTable";
import ShowProduct from "@/components/template/p-admin/Home/ShowNewPro/ShowProduct";
import db from "@/config/db";
import orderModel from "@/models/order";
import productModel from "@/models/product";
import userModel from "@/models/user";
import { rateFunc } from "@/utils/rate";
import { memo } from "react";

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
    .select("title images price colors name")
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  const rate = await rateFunc(allProducts);

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
        rate={rate}
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
  rate: any;
};

const PageMemo = memo(
  ({
    productsCount,
    usersCount,
    ordersCount,
    deliveredOrdersCount,
    allOrders,
    allProducts,
    rate,
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
          <ShowProduct
            products={JSON.parse(JSON.stringify(allProducts))}
            rate={rate}
          />
        </div>
      </>
    );
  }
);

const TopBarMemo = memo(() => {
  return <TopBar title="صفحه اصلی" isPanelUser={false} />;
});

export default Page;
