"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperProduct from "@/components/module/SwiperProduct/SwiperProduct";

function SwiperRel({ products }: { products: any[] }) {
  return (
    <div className="mt-5">
      <Swiper
        slidesPerView={5.5}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5.5,
            spaceBetween: 20,
          },
        }}
        className="mySwiper !h-[400px]"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <SwiperProduct {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperRel;
