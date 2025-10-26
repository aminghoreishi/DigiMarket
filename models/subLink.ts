// models/subLink.ts
import mongoose from "mongoose";

const subLinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      required: true,
    },
    parentLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link", 
      default: null,
    },
    parentSubLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subLink", // به خودش (برای subSubLink)
      default: null,
    },
    // فرزندان (subSubLink)
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subLink",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subLinkSchema.virtual("subChildren", {
  ref: "subLink",
  localField: "_id",
  foreignField: "parentSubLink",
});

const subLinkModel =
  mongoose.models.subLink || mongoose.model("subLink", subLinkSchema);

export default subLinkModel;