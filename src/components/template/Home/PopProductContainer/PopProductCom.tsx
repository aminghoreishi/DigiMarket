import Image from "next/image";

function PopProductCom({
  title,
  image,
  index,
}: {
  title: string;
  image: string;
  index: number;
}) {
  return (
    <div className="flex items-center gap-5">
      
    
      <div className="relative w-[80px] h-[80px] flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      <p className="text-2xl font-danaMed text-orange-500 ss02 w-4 text-center">
        {index + 1}
      </p>


      <p className="font-danaMed text-xs md:text-sm line-clamp-2">
        {title}
      </p>
    </div>
  );
}

export default PopProductCom;
