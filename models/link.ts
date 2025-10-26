
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    href: { type: String, required: true },
    subLink: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subLink",
      },
    ],
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const linkModel = mongoose.models.Link || mongoose.model("Link", linkSchema);
export default linkModel