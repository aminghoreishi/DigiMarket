import mongoose, { Schema } from "mongoose";

const comment = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    isOk: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, 
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Schema.Types.ObjectId, 
      ref: "product",
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const commentModel =
  mongoose.models.comment || mongoose.model("comment", comment);

export default commentModel;
