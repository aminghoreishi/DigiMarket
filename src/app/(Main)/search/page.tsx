import Search from "@/components/template/search/search";
import db from "@/config/db";
import productModel from "@/models/product";
import React from "react";

async function page({
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams["query"];
  const name = Array.isArray(query) ? query[0] : query || "";
  console.log(name);

  const ram = searchParams["ram"];

  console.log(ram);

  const minPrice = searchParams.min_price ? Number(searchParams.min_price) : 0;
  const maxPrice = searchParams.max_price
    ? Number(searchParams.max_price)
    : undefined;

  await db();

  const filter: any = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { longDescription: { $regex: query, $options: "i" } },
    ],
    price: {
      $gte: minPrice,
      ...(maxPrice && { $lte: maxPrice }),
    },
  };

  if (ram) {
    filter.features = {
      $elemMatch: { name: "رم", value: ram },
    };
  }

  const findedProducts = await productModel.find({ ...filter }).lean();

  console.log(findedProducts);

  return (
    <div className="container mx-auto font-danaMed">
      <h2 className="mt-12 max-sm:text-base text-2xl">
        نتیجه جستجو برای "لپ تاپ گیمینگ"
      </h2>

      <div className="mt-8">
        <Search findedProducts={JSON.parse(JSON.stringify(findedProducts))} />
      </div>
    </div>
  );
}

export default page;
