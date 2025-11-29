"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
const SwiperImage = memo(({ images, id }: { images: string[]; id: string }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isExits, setIsExits] = useState(null);

  useEffect(() => {
    const findWhich = JSON.parse(localStorage.getItem("which") || "[]");
    if (findWhich.length) {
      const isExits = findWhich.find((item: any) => item === id);
      if (isExits) {
        setIsExits(true);
      } else {
        setIsExits(false);
      }
    }
  }, []);

  const addWhich = () => {
    const which = JSON.parse(localStorage.getItem("which") || "[]");
    if (which.length) {
      const isExits = which.find((item) => item === id);
      if (!isExits) {
        localStorage.setItem("which", JSON.stringify([...which, id]));
        setIsExits(true);
      }
    } else {
      localStorage.setItem("which", JSON.stringify([id]));
      setIsExits(true);
    }
  };

  return (
    <div className="gallery-container">
      <div className="relative">
        <Swiper
          style={
            {
              ["--swiper-navigation-color" as string]: "#fff",
              ["--swiper-pagination-color" as string]: "#fff",
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 !-z-10"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-56 sm:h-72 md:h-96 lg:h-[400px] relative">
                <Image
                  src={image}
                  alt="gallery"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 400px"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}

       
        </Swiper>

        <div
          className={`absolute top-4 right-4 z-10 cursor-pointer ${isExits ? "bg-black/50" : ""} p-1 rounded`}
          onClick={addWhich}
        >
          {isExits !== null && (
            <FaHeart
              color={isExits ? "red" : "white"}
              className={`text-white ${isExits ? "text-red-500" : ""} hover:text-red-500 transition-colors`}
            />
          )}

          {isExits === null && (
          <div className="size-8 bg-gray-500 animate-bounce rounded-full
          "></div>
          )}
        </div>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4.5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper !-z-50 mt-4 max-sm:!h-20"
        breakpoints={{
          320: { slidesPerView: 3.5 },
          480: { slidesPerView: 4.5 },
          768: { slidesPerView: 5.5 },
          1024: { slidesPerView: 6.5 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full border-2 border-zinc-200 h-20 cursor-pointer relative rounded overflow-hidden">
              <Image
                src={image}
                alt={`thumb-${index}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default SwiperImage;
