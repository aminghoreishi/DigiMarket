import MyAccordion from "./Acc";
import Exits from "./Exits";
import SearchProContainer from "./SearchProContainer";
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
          <SearchProContainer findedProducts={findedProducts} />
        </div>
      </div>
    </div>
  );
}

export default Search;
