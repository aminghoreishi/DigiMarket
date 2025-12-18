"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BrandType } from "@/types/brand.type";

interface BrandSwiperContainerProps {
  brands: BrandType[];
}

const BrandSwiperContainer: React.FC<BrandSwiperContainerProps> = ({
  brands,
}) => {
  return (
    <div className="container mx-auto mt-6">
      <Swiper
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 2.2,
          },
          640: {
            slidesPerView: 3.2,
          },
          768: {
            slidesPerView: 4.5,
          },
          1024: {
            slidesPerView: 6.5,
          },
          1280: {
            slidesPerView: 8.5,
          },
        }}
        className="!py-4"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <div className="h-full px-1">
              <div
                className="
                flex flex-col items-center justify-center
                bg-white rounded-xl
                border border-gray-100
                shadow-sm
                hover:shadow-md transition
                h-[120px]
                p-4
              "
              >
                <div className="relative w-14 h-14 mb-2">
                  <Image
                    src={brand.img}
                    alt={brand.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-xs font-danaMed text-gray-700 text-center line-clamp-1">
                  {brand.title}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSwiperContainer;
