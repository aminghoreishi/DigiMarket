import db from "@/config/db";
import linkModel from "@/models/link";
import { LinkType } from "@/types/link.type";
import Link from "next/link";
import React from "react";

async function HeaderMenu() {
  await db();

  const links = (await linkModel
    .find({})
    .populate("subLink")
    .lean({ virtuals: true })
    .exec()) as unknown as LinkType[];

  console.log(links);

  return (
    <div className="container mx-auto bg-gray-100 py-3">
      <ul className=" text-sm">
        {links.map((link) => (
          <li className="font-danaMed cursor-pointer" key={link._id}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderMenu;
