import CartContainer from "@/components/template/cart/cartContainer/CartContainer";
import TopSec from "@/components/template/cart/TopSec/TopSec";

function page() {
  return (
    <div className="container mx-auto">
      <TopSec />

      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <CartContainer />
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="mt-8">
            <h2 className="font-danaMed text-lg">خلاصه سفارش</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
