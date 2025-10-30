"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import Image from "next/image";
import { BrandType } from "@/types/brand.type";

interface BrandSwiperContainerProps {
  brands: BrandType[];
}

const BrandSwiperContainer: React.FC<BrandSwiperContainerProps> = ({ brands }) => {
  return (
    <div className="container mx-auto mt-5">
      <Swiper
        slidesPerView={8.5}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper !h-[200px]"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="relative w-full h-full max-w-[180px] max-h-[120px]">
                <Image
                  src={brand.img}
                  fill
                  sizes="(max-width: 768px) 100px, 180px"
                  alt={brand.title}
                  className="object-contain"
                  priority={false}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSwiperContainer;