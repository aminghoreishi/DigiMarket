"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
type SwiperImageProps = {
  images: string[];
  id: string;
};

const SwiperImage = memo(({ images, id }: SwiperImageProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("which") || "[]";
      const arr: string[] = JSON.parse(data);
      setIsLiked(arr.includes(id));
    } catch {}
  }, [id]);

  const toggleLike = () => {
    try {
      const data = localStorage.getItem("which") || "[]";
      const arr: string[] = JSON.parse(data);

      if (arr.includes(id)) {
        localStorage.setItem(
          "which",
          JSON.stringify(arr.filter((x) => x !== id))
        );
        setIsLiked(false);
      } else {
        localStorage.setItem("which", JSON.stringify([...arr, id]));
        setIsLiked(true);
      }
    } catch {}
  };

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="gallery-container">
      <div className="relative">
        <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[400px]">
          <Image
            src={images[activeIndex]}
            alt="محصول"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 400px"
            priority
          />

          {images.length > 1 && (
            <>
             

              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
              >
                <MdKeyboardArrowRight/>
              </button>
               <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
              >
                <MdKeyboardArrowLeft/>
              </button>
            </>
          )}

          <button
            onClick={toggleLike}
            className="absolute top-4 right-4 z-20 bg-black/50 p-3 rounded-full"
          >
            <svg
              className={`w-7 h-7 ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-20 h-20 border-2 ${
                  activeIndex === i ? "border-white" : "border-zinc-200"
                }`}
              >
                <Image
                  src={src}
                  alt={`thumb ${i + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

SwiperImage.displayName = "SwiperImage";

export default SwiperImage;
