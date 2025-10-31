"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { memo, useState } from "react";
import Image from "next/image";

function SwiperImage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="gallery-container">
      <div className="relative">
        <Swiper
          style={
            {
              ["--swiper-navigation-color" as string]: "#fff",
              ["--swiper-pagination-color" as string]: "#fff",
              height: "400px",
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <Image
              width={400}
              height={400}
              alt="gallery"
              src="/image/laptop.webp"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <div className="absolute top-4 right-4 z-10 cursor-pointer bg-black/50 p-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white hover:text-red-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-4"
        style={{ height: "100px" }}
      >
        <SwiperSlide>
          <Image
            width={100}
            height={100}
            alt="gallery"
            src="/image/laptop.webp"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SwiperImage;
