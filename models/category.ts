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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

category.virtual("subCategory", {
  ref: "subCategory",
  localField: "_id",
  foreignField: "category",
});

const categoryModel =
  mongoose.models.category || mongoose.model("category", category);

export default categoryModel;
