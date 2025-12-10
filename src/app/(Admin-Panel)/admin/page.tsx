import TopBar from "@/components/module/p-admin/TopBar/TopBar";
import Information from "@/components/template/p-admin/Home/Information";
import OrderTable from "@/components/template/p-admin/Home/OrderTable";
import db from "@/config/db";
import orderModel from "@/models/order";
import productModel from "@/models/product";
import userModel from "@/models/user";

async function page() {
  await db();
  const products = await productModel.countDocuments({});
  const users = await userModel.countDocuments({});
  const orders = await orderModel.countDocuments({});
  const deliveredOrders = await orderModel.countDocuments({status: 'delivered'});

  const allOrders = await orderModel.find({}).limit(3).lean();
  return (
    <div>
      <TopBar title="صحفه اصلی" />

      <div>
        <Information productsCount={products} usersCount={users} ordersCount={orders} />
      </div>
      <div className="mt-10">
      <OrderTable orders={JSON.parse(JSON.stringify(allOrders))} />
      </div>
    </div>
  );
}

export default page;
