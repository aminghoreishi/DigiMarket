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

  await db();

  const findedProducts = await productModel.find({
    $or: [
      { name: { $regex: name, $options: "i" } },
      { longDescription: { $regex: name, $options: "i" } },
    ],
  });

  console.log(findedProducts);

  return (
    <div className="container mx-auto font-danaMed">
      <h2 className="mt-12 max-sm:text-base text-2xl">نتیجه جستجو برای "لپ تاپ گیمینگ"</h2>

      <div className="mt-8">
        <Search findedProducts={JSON.parse(JSON.stringify(findedProducts))} />
      </div>
    </div>
  );
}

export default page;
