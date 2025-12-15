import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  aboutUs: { type: String, required: true },

  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },

  featuredLinks: {
    type: [
      {
        name: { type: String, required: true },
        img: { type: String, required: true },
        slug: { type: String, required: true }, // ✅ درست
      },
    ],
    default: [],
  },

  socialMediaLinks: {
    telegram: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    whatsapp: { type: String },
  },
});

const footerModel =
  mongoose.models.Footer || mongoose.model("Footer", footerSchema);

export default footerModel;
