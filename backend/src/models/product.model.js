import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter Product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter Product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter Price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            public_url: {
                type: String,
                required: true
            },
            _id: false
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter Product category"]
    },
    stock: {
        type: Number,
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
                maxLength: [100, "Comment cannot exceed 100 characters"],
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Product = mongoose.model("Product", productSchema);