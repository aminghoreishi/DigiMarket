import SwiperProductContainer from "@/components/module/SwiperProductContainer/SwiperProductContainer";

function SwiperPop({ products }) {
  if (!products) {
    return (
      <div className="text-center font-danaMed text-zinc-400 py-10">
      هیچ محصولی وجود ندارد!
      </div>
    );
  }
  return <SwiperProductContainer products={products} />;
}

export default SwiperPop;
