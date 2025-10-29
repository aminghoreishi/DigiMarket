"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // ایمپورت ماژول‌های لازم
import "swiper/css";
import "swiper/css/pagination";
import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";

function SwiperPop() {
  return (
    <div className="w-full container mx-auto overflow-hidden mt-5 mb-5">
      <Swiper
        slidesPerView={5.5} // 👈 سه و نیم اسلاید نشون بده
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

export default SwiperPop;
