import { Types } from "mongoose";
import { SubLinkType } from "./subLink.type";

export type LinkType = {
  href: string;
  title: string;
  subLink: SubLinkType[];
  _id: string;
};
