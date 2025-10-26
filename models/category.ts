import mongoose from "mongoose";

const category = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    parentSubId: {
      type: mongoose.Types.ObjectId,
      ref: "subLink",
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

const categoryModel =
  mongoose.models.Category || mongoose.model("Category", category);

export default categoryModel;
