import Search from "@/components/template/search/search";
import db from "@/config/db";
import productModel from "@/models/product";

import { redirect } from "next/navigation"; 
async function page({
  searchParams,
}: {
  params?: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams["query"];
  const name = Array.isArray(query) ? query[0] : query || "";
  console.log("Search query:", name);

  const ram = searchParams["ram"];
  const numberAnt = searchParams["numberAnt"];
  console.log("Selected RAM:", ram);

  const minPrice = searchParams.min_price ? Number(searchParams.min_price) : 0;
  const maxPrice = searchParams.max_price
    ? Number(searchParams.max_price)
    : undefined;

  await db();

  const filter: any = {
    $or: [
      { name: { $regex: name, $options: "i" } },
      { longDescription: { $regex: name, $options: "i" } },
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
  if (numberAnt) {
    filter.features = {
      $elemMatch: { name: "تعداد آنتن", value: numberAnt },
    };
  }

  const findedProducts = await productModel
    .find(filter)
    .populate("subCategory")
    .lean();

  console.log(findedProducts);

  const hasActiveFilters = ram || numberAnt || minPrice > 0 || maxPrice;

  if (findedProducts.length === 0 && hasActiveFilters) {
    const cleanUrl = query ? `?query=${encodeURIComponent(query)}` : "/search";
    redirect(cleanUrl);
  }

  return (
    <div className="container mx-auto font-danaMed px-4 sm:px-6 lg:px-8">
      <h2 className="mt-12 text-2xl">
        نتیجه جستجو برای "{name || "همه محصولات"}"
      </h2>

      <div className="mt-8">
        <Search findedProducts={JSON.parse(JSON.stringify(findedProducts))} />
      </div>
    </div>
  );
}

export default page;
