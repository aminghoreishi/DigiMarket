import TopSec from "@/components/template/cart/TopSec/TopSec";
import Checkout from "@/components/template/checkout/checkout";

function page() {
  return (
    <div className="container mx-auto">
      <TopSec />
      <Checkout />
    </div>
  );
}

export default page;
