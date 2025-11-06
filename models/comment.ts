import mongoose from "mongoose";

const comment = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    isOk: {
      type: Boolean,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const commentModel =
  mongoose.models.comment || mongoose.model("comment", comment);

export default commentModel;
