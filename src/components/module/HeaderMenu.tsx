import db from "@/config/db";
import linkModel from "@/models/link";
import { LinkType } from "@/types/link.type";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
async function HeaderMenu() {
  await db();

  const links = (await linkModel
    .find({})
    .populate("subLink")
    .lean({ virtuals: true })
    .exec()) as unknown as LinkType[];

  console.log(links);

  return (
    <div className="container mx-auto bg-gray-50 py-5">
      <ul className="text-xs flex items-center gap-x-3">
        {links.map((link) => (
          <li
            className="font-danaMed group relative cursor-pointer flex items-center gap-x-2"
            key={link._id}
          >
            <span>
              <Link href={link.href}>{link.title}</Link>
            </span>
            {link.subLink.length !== 0 && <MdKeyboardArrowDown className=" transition-all group-hover:rotate-180" />}

            {link.subLink.length !== 0 && <div className="absolute -bottom-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white w-[200px] p-3 ">dd</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderMenu;
