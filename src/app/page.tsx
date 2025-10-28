import Category from "@/components/template/Home/Category/Category";
import PopProduct from "@/components/template/Home/popProduct/PopProduct";
import SwiperBanner from "@/components/template/Home/SwiperBanner/SwiperBanner";
import React from "react";

function Home() {
  return (
    <div>
      <SwiperBanner />
      <Category/>
      <PopProduct/>
    </div>
  );
}

export default Home;