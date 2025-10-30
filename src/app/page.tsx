import Footer from "@/components/module/Footer/Footer";
import Banner from "@/components/template/Home/Banner/Banner";
import Category from "@/components/template/Home/Category/Category";
import NewProduct from "@/components/template/Home/NewProduct/NewProduct";
import PopProduct from "@/components/template/Home/popProduct/PopProduct";
import PopProductContainer from "@/components/template/Home/PopProductContainer/popProductContainer";
import SwiperBanner from "@/components/template/Home/SwiperBanner/SwiperBanner";

function Home() {
  return (
    <div>
      <SwiperBanner />
      <Category />
      <PopProductContainer />
      <PopProduct />
      <Banner />
      <NewProduct />
      <Footer />
    </div>
  );
}

export default Home;
