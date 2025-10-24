import mongoose from "mongoose";

const link = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    subLink: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subLink",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const linkModel = mongoose.models.Link || mongoose.model("Link", link);

export default linkModel;
