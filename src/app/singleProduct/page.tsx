import BredCrumbs from "@/components/template/SingleProduct/BreadCrumbs/BredCrumbs";
import Info from "@/components/template/SingleProduct/Info/Info";

function page() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-10">
          <div className="grid grid-cols-2">
            <div>
              <div>Image</div>
            </div>
            <div>
              <BredCrumbs />
              <Info/>
            </div>
          </div>
        </div>
        <div className="col-span-2">d</div>
      </div>
    </div>
  );
}

export default page;
