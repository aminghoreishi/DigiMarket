"use client";
import CartContainer from "../cartContainer/CartContainer";
function MainCart() {
  return (
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
  );
}

export default MainCart;
