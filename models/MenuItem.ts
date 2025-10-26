import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
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
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      default: null,
    },
    // children رو حذف کردیم!
  },
  {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
);

// Virtual: فرزندان بر اساس parent
menuItemSchema.virtual("children", {
  ref: "MenuItem",
  localField: "_id",
  foreignField: "parent",
});

const MenuItem =
  mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;