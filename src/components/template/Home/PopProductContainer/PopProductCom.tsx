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
      <div>
        <Image src={image} width={200} height={200} alt={title} />
      </div>
      <div>
        <p className="text-2xl font-danaMed text-orange-500 ss02">{index + 1}</p>
      </div>
      <div>
        <p className="font-danaMed text-xs md:text-sm line-clamp-2">{title}</p>
      </div>
    </div>
  );
}

export default PopProductCom;
