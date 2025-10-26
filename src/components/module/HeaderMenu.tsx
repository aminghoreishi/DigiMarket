import db from "@/config/db";
import subLinkModel from "@/models/subLink";
import linkModel from "@/models/link";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";

async function HeaderMenu() {
  await db();

  // مرحله ۱: لینک‌ها + زیرمنوهای سطح اول
  const links = await linkModel
    .find({})
    .populate({
      path: "subLink",
      populate: { path: "children" }, // children هم populate بشه
    })
    .lean()
    .exec();

  // لاگ کامل برای دیباگ
  console.log("=== لینک‌ها با زیرمنوهای دو سطحی ===");

  return (
    <div className="container mx-auto">
      <div className="bg-gray-50 px-3 py-5">
        <ul className="text-xs flex items-center gap-x-3">
          {links.map((link) => (
            <li
              // key={link._id.toString()}
              className="font-danaMed group relative cursor-pointer flex items-center gap-x-2"
            >
              <span>{link.title}</span>

              {link.subLink && link.subLink.length > 0 && (
                <MdKeyboardArrowDown className="transition-all group-hover:rotate-180" />
              )}

              {link.subLink && link.subLink.length > 0 && (
                <ul className="absolute  z-10 -bottom-14 duration-300 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white w-[200px] p-3 shadow-lg rounded-md">
                  {link.subLink.map((sub: any) => (
                    <li key={sub._id.toString()} className="py-1 group">
                      <div className="font-medium  flex items-center justify-between hover:text-blue-600 cursor-pointer">
                        {sub.title}
                        <MdKeyboardArrowLeft />
                      </div>
                      <div className=" absolute invisible group-hover:visible -left-56 w-[200px] top-0  bg-white p-2">
                        <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                          {sub.children.map((child: any) => (
                            <li
                              key={child._id.toString()}
                              className="text-xs hover:text-blue-600 cursor-pointer"
                            >
                              {child.title}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* زیرمنوهای سطح دوم (children) */}
                      {/* {sub.children && sub.children.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                          {sub.children.map((child: any) => (
                            <li
                              key={child._id.toString()}
                              className="text-xs hover:text-blue-600 cursor-pointer"
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
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenu;
