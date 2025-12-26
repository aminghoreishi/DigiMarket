import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import type { Category } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

async function Category() {
  await db();

  const category = (await subCategoryModel
    .find({ img: { $exists: true, $ne: "" } })
    .limit(4)
    .lean()) as unknown as Category[];

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center items-baseline flex-wrap">
        {category.map((cat) => (
          <div key={cat._id}>
            <Link href={cat.href}>
              <div className="rounded-xl p-2">
                <div className="border-2 flex justify-center border-gray-300 px-6 py-3 rounded-lg">
                  <Image
                    src={cat.img}
                    width={100}
                    height={100}
                    className="object-cover max-sm:size-20"
                    alt="cat"
                    priority={true}
                  />
                </div>
                <div className="flex justify-center mt-2 font-danaMed max-sm:text-xs text-sm">
                  <h2>{cat.title}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
