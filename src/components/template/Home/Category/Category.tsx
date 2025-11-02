import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import type { Category } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

async function Category() {
  await db();

  const category = (await subCategoryModel
    .find({})
    .lean()) as unknown as Category[];

  return (
    <div
      className="container mx-auto mt-5
    "
    >
      <div className="flex justify-center gap-x-3">
        {category.map((cat) => (
          <div>
            <Link href={cat.href}>
              <div className="rounded-xl p-2">
                <div className="border-2 border-gray-300 px-6 py-3 rounded-lg">
                  <Image
                    src={cat.img}
                    width={100}
                    height={100}
                    className="  object-cover"
                    alt="cat"
                  />
                </div>
                <div className="flex justify-center mt-2 font-danaMed text-sm">
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
