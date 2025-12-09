import { toEnglish } from "@/utils/color";

import Image from "next/image";
import Link from "next/link";

function SwiperProduct({
  title,
  images,
  price,
  _id,
  colors,
  name
}: {
  title: string;
  images: string[];
  price: number;
  _id: string;
  colors: string[];
  name: string;
}) {
  return (
    <div className="border-2 px-4 py-3 border-gray-200 rounded-xl">
      <div className="flex justify-center">
        <Image
          src={images?.[0] || images?.[1] || "/image/placeholder.png"}
          className="!size-52"
          width={200}
          height={200}
          alt={title || "product"}
        />
      </div>
      <div>
        <p className="text-zinc-400 text-xs line-clamp-1">{name}</p>
        <div className="cursor-pointer">
          <Link href={`/singleProduct/${_id}`}>
            <span className="text-zinc-800 font-danaMed text-xs md:text-sm h-8 lg:h-10 line-clamp-2 mt-2">
              {title}
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-between mt-4 border-dashed border-b-[1px] pb-5">
          <div className="flex gap-1.5">
            {(colors ?? []).map((color, index) => (
              <div
                key={index}
                className="size-4 rounded-full border-2 border-white shadow-md ring-1 ring-gray-300 transition-transform hover:scale-110"
                style={{ backgroundColor: toEnglish(color) }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-start gap-x-1 text-xs text-zinc-500">
            <span className="font-danaMed ss02">
              <span>(12)</span>
              <span>3.9</span>
            </span>
            <svg
              className="fill-primary-500"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="#f9bc00"
              viewBox="0 0 256 256"
            >
              <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
            </svg>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <p className="text-sm font-danaMed ss02">{price.toLocaleString()}</p>
          <Image
            src="/image/toman.png"
            width={100}
            height={100}
            alt="toman"
            className="mt-1 mr-1 !size-4"
          />
        </div>
      </div>
    </div>
  );
}

export default SwiperProduct;
