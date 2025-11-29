import mongoose from "mongoose";

const offs = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    use: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const offsModel = mongoose.models.offs || mongoose.model("offs", offs);
export default offsModel;
