import MyAccordion from "./Acc";
import Exits from "./Exits";
import SearchProContainer from "./SearchProContainer";
function Search({ findedProducts }: { findedProducts: any[] }) {
  return (
    <div className="grid grid-cols-12 gap-5">
      {findedProducts.length === 0 ? (
        <div className="col-span-12 text-center py-20">
          <h2 className="text-2xl mb-4">هیچ محصولی یافت نشد</h2>
          <p className="text-gray-600">
            لطفاً فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید.
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Search;
