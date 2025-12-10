import SwiperProductContainer from "@/components/module/SwiperProductContainer/SwiperProductContainer";
function ShowProduct({ products }: { products: any[] }) {
  return (
    <>
      <h2 className="font-danaMed">اخرین محصولات</h2>

      <SwiperProductContainer products={products} />
    </>
  );
}

export default ShowProduct;
