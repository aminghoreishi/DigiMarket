"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";

function SwiperPop() {
  return (
    <div className="w-full container mx-auto overflow-hidden mt-5 mb-5">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        <SwiperSlide>
          <SwiperProduct />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperProduct />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperProduct />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperProduct />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperProduct />
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
}

export default SwiperPop;
