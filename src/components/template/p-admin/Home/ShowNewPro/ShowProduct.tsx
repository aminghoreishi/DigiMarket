import SwiperProductContainer from "@/components/module/SwiperProductContainer/SwiperProductContainer";
function ShowProduct({ products, rate }: { products: any[] }) {
  console.log(rate);

  return (
    <>
      <h2 className="font-danaMed">اخرین محصولات</h2>
      <SwiperProductContainer products={products} rate={rate} />
    </>
  );
}

export default ShowProduct;
