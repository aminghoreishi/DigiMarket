import { Types } from "mongoose";

export type Category = {
  title: string;
  href: string;
  category: string | Types.ObjectId;
  img: string;
};
