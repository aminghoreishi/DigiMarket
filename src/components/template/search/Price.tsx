"use client";
import { useState } from "react";

export default function PriceRangeFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100_000_000);

  const MIN = 0;
  const MAX = 200_000_000;

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  return (
    <div className="space-y-6 px-4 pt-4">
      <div className="flex justify-between text-sm">
        <span className="font-danaMed">{formatPrice(minPrice)}</span>
        <span className="text-gray-500">تا</span>
        <span className="font-danaMed">{formatPrice(maxPrice)}</span>
      </div>

      <div className="relative h-10">
        <div className="absolute inset-x-0 top-4 h-1 bg-gray-200 rounded-full"></div>

        <div
          className="absolute top-4 h-1 bg-orange-500 rounded-full"
          style={{
            left: `${(minPrice / MAX) * 100}%`,
            right: `${100 - (maxPrice / MAX) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minPrice}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxPrice - 500_000);
            setMinPrice(value);
          }}
          className="absolute w-full h-10 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none] [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxPrice}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minPrice + 500_000);
            setMaxPrice(value);
          }}
          className="absolute w-full h-10 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatPrice(MIN)}</span>
        <span>{formatPrice(MAX)}</span>
      </div>
    </div>
  );
}
