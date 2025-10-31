import BredCrumbs from "@/components/template/SingleProduct/BreadCrumbs/BredCrumbs";
import Cart from "@/components/template/SingleProduct/Cart/Cart";
import Info from "@/components/template/SingleProduct/Info/Info";
import SwiperImage from "@/components/template/SingleProduct/SwiperImage/SwiperImage";

function page() {
  return (
    <div className="">
      <div className="grid xl:grid-cols-12 gap-5 mt-5">
        <div className="col-span-9">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <div>
                <SwiperImage/>
              </div>
            </div>
            <div className="container mx-auto">
              <BredCrumbs />
              <Info/>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <Cart/>
        </div>
      </div>
    </div>
  );
}

export default page;
