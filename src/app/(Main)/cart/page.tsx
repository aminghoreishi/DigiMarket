
import MainCart from "@/components/template/cart/MainCart/MainCart";
import TopSec from "@/components/template/cart/TopSec/TopSec";

function page() {
  return (
    <div className="container mx-auto">
      <TopSec />

      <div>
        <MainCart />
      </div>
    </div>
  );
}

export default page;
