import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
  delivery: {
    type: Number,
    required: true,
    default: 1,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  features: [
    {
      name: String,
      value: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

product.virtual("comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "product",
});

const productModel =
  mongoose.models.product || mongoose.model("product", product);

export default productModel;
