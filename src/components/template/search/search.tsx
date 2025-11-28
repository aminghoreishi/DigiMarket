import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";
import MyAccordion from "./Acc";
import Exits from "./Exits";
function Search({ findedProducts }: { findedProducts: any[] }) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <MyAccordion
          subCategory={findedProducts.map((item) => item.subCategory)}
        />
        <Exits />
      </div>
      <div className="col-span-12 max-sm:row-end-1 md:col-span-8 lg:col-span-9">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {findedProducts.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 mt-10">
              متأسفانه محصولی یافت نشد.
            </div>
          ) : (
            findedProducts.map((item) => (
              <SwiperProduct key={item._id} {...item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
