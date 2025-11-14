"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";

function SwiperProductContainer({ products = [] }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center text-zinc-400 py-10">
        در حال بارگذاری محصولات...
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto overflow-hidden mt-5 mb-5">
      <Swiper
        slidesPerView={5.5}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 14 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5.5, spaceBetween: 20 },
        }}
        className="mySwiper !h-[400px]"
      >
        {products.map((pro) => (
          <SwiperSlide key={pro._id || pro.id || pro.title}>
            <SwiperProduct {...pro} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperProductContainer;
