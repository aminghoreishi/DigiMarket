import SwiperProductContainer from "@/components/module/SwiperProductContainer/SwiperProductContainer";

function SwiperPop({ products }) {
  if (!products) {
    return (
      <div className="text-center text-zinc-400 py-10">
        در حال بارگذاری محصولات...
      </div>
    );
  }
  return <SwiperProductContainer products={products} />;
}

export default SwiperPop;
