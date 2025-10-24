import mongoose from "mongoose";

const sub = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parentLinkId: {
      type: mongoose.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const subLinkModel = mongoose.models.subLink || mongoose.model("subLink", sub);

export default subLinkModel;
