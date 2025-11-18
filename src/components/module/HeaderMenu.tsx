import db from "@/config/db";
import categoryModel from "@/models/category";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

async function HeaderMenu() {
  await db();

  const category = await categoryModel
    .find({})
    .populate({
      path: "subCategory",
      populate: {
        path: "subSubCategory",
      },
    })
    .lean({ virtuals: true });

  // console.log(category);

  return (
    <div className="bg-gray-50 px-3 py-5">
      <div className="container mx-auto">
        <ul className="text-xs flex items-center gap-x-6">
          <li className="font-danaMed">
            <Link href="/">صحفه اصلی</Link>
          </li>
          {category.map((cat: any) => (
            <li
              key={cat._id.toString()}
              className="font-danaMed group relative cursor-pointer flex items-center gap-x-1  transition-colors"
            >
              <span>
                <Link href={cat.href}>{cat.title}</Link>
              </span>

              {cat.subCategory && cat.subCategory.length > 0 && (
                <MdKeyboardArrowDown className="text-lg transition-transform duration-300 group-hover:rotate-180" />
              )}

              {cat.subCategory && cat.subCategory.length > 0 && (
                <ul className="absolute right-[50%] top-full mt-2 w-56 bg-white shadow-xl rounded-md p-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {cat.subCategory.map((sub: any) => (
                    <li key={sub._id.toString()} className="group/sub relative">
                      <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                        <span className="font-medium text-sm">
                          <Link href={sub.href}> {sub.title}</Link>
                        </span>
                        {/* {sub.children && sub.children.length > 0 && (
                          <MdKeyboardArrowLeft className="text-lg" />
                        )} */}
                      </div>

                      {/* {sub.subChildren && sub.subChildren.length > 0 && (
                        <ul className="absolute right-[108%] -top-2 w-56 bg-white shadow-xl rounded-md p-2 z-50 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 -ml-1">
                          {sub.subChildren.map((child: any) => (
                            <li
                              key={child._id.toString()}
                              className="px-3 py-2 text-sm hover:bg-gray-100 hover:text-blue-600 rounded-md cursor-pointer transition-colors"
                            >
                              {child.title}
                            </li>
                          ))}
                        </ul>
                      )} */}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="font-danaMed">
            <Link href="/cart">سبد خرید</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenu;
