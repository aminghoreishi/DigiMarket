import mongoose from "mongoose";
const subSubCategory = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "subCategory",
    required: true,
  },
});

const subSubCategoryModel =
  mongoose.models.subSubCategory ||
  mongoose.model("subSubCategory", subSubCategory);

export default subSubCategoryModel;
