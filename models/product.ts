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
    img: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['laptop', 'smartwatch']
    },
    color: {
        type: [String],
        required: true,
    },
    feature: {
        type: [String],
        required: false,
    },
    price: {
        type: Number,
        required: true
    }
});

const productModel = 
    mongoose.models.product || mongoose.model("product", product);

export default productModel;
