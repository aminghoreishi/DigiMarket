"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";

function SwiperProductContainer() {
  return (
    <div className="w-full container mx-auto overflow-hidden mt-5 mb-5">
      <Swiper
        slidesPerView={5.5}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper !h-[400px]"
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

export default SwiperProductContainer;
