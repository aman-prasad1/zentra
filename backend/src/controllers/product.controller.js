import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import { redis } from '../db/redis.js';
import { normalizeQuery, buildProductSearchKey } from "../utils/cacheKey.js";
import fs from 'fs';


const CACHE_TTL = 300; // 5 minutes : for cashing keys on the resid DB


const getAllProducts = asyncHandler(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();


    // generating unique cachekey for redis
    const cacheKey = buildProductSearchKey({
        q: req.query.keyword,
        page: req.query.page,
        limit: resultPerPage,
        category: req.query.category,
        priceGte: req.query['price[gte]'],
        priceLte: req.query['price[lte]'],
    });


    const cached = await redis.get(cacheKey);
    if (cached) { // if allready cached in redis return the response
        const responseData = typeof cached === 'string' ? JSON.parse(cached) : cached;
        if (responseData && !Array.isArray(responseData)) {
            return res
                .status(200)
                .json(
                    new ApiResponse(200, "Products Fetched", responseData)
                )
        }
    }

    // Get count of filtered products before pagination is applied
    const countApiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();
    const filteredProductCount = await countApiFeature.query.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    let products = await apiFeature.query;

    const responseData = {
        products,
        productCount,
        filteredProductCount,
        resultPerPage
    };

    await redis.setex( // set response with uniquely created cacheKey
        cacheKey,
        CACHE_TTL,
        JSON.stringify(responseData)
    );
console.log("from mongo");
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Products Fetched", responseData)
        )
})

const productDetails = asyncHandler(async (req, res) => {
    const cacheKey = `productDetail:${req.params.id}`
    const cached = await redis.get(cacheKey);
    if(cached) {
        return res
        .status(200)
        .json(
            new ApiResponse(200, "Product Details fetched Successfully", { productDetail: cached })
        )
    }

    const productDetail = await Product.findById(req.params.id);

    if (!productDetail) {
        throw new ApiError(404, "Product not found")
    }

    await redis.setex(
        cacheKey,
        CACHE_TTL,
        JSON.stringify(productDetail)
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Product Details fetched Successfully", { productDetail })
        )
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment, productId } = req.body;

    if (isNaN(rating) || (rating < 1 || rating > 5)) {
        throw new ApiError(400, "Rating should be a number and in between range 1-5");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const newReview = {
        user: req.user._id,
        rating: rating,
        comment: comment
    }

    product.reviews.push(newReview);
    product.numberOfReviews = product.reviews.length;

    // calculating product overall ragting
    let totalRatingsCnt = 0;
    for (const review of product.reviews) {
        totalRatingsCnt += review.rating;
    }

    product.ratings = (totalRatingsCnt / product.numberOfReviews);

    await product.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Review Added Successfully", { newReview })
        )
})

const deleteReview = asyncHandler(async (req, res) => {
    const { productId, reviewId } = req.body;

    if (!productId || !reviewId) {
        throw new ApiError(400, "Product id and review id required");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let reviewToDelete = null;
    let newReviews = [];
    let totalRatings = 0;
    for (const review of product.reviews) {
        if (review.user.toString() === req.user._id.toString() && review._id.toString() === reviewId.toString()) {
            reviewToDelete = review;
        } else {
            newReviews.push(review);
            totalRatings += review.rating;
        }
    }

    if (!reviewToDelete) {
        console.log("hello");
        throw new ApiError(404, "Review not found");
    }

    product.numberOfReviews = newReviews.length;
    product.ratings = (!product.numberOfReviews) ? 0 : totalRatings / product.numberOfReviews;
    product.reviews = newReviews;

    await product.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Review deleted Successfully")
        )
})

const getProductReviews = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Reviews fetched Successfully", { reviews: product.reviews })
        )
})

// Admin controllers
const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // checking all fieds are present or not
        if ([name, description, category].some(field => !field || field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        if (!price) {
            throw new ApiError(400, "Price is required");
        }

        if (!req.files['product-images']) {
            throw new ApiError(400, "Product Images are required");
        }

        const images = []; // for product images
        for (const image of req.files['product-images']) {
            const uploadImage = await uploadOnCloudinary(image);
            images.push({
                public_id: uploadImage.public_id,
                public_url: uploadImage.url
            })
        }


        const product = new Product({
            name: name,
            description: description,
            price: price,
            images: images,
            category: category,
            stock: stock,
            user: req.user._id
        })

        await product.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Product Added Successfully", { product })
            )


    } catch (error) {
        if (req.files['product-images']) {
            for (const image of req.files['product-images']) {
                fs.unlink(image.path, (error) => { });
            }
        }

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        throw new ApiError(statusCode, message);
    }
})

const getAdminProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "All admin products fetched", { products })
        )
})

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const images = product.images; // saving product images id to delete form cloudinary

    await product.deleteOne(); // deleting product

    // deleting images from cloudinary
    for (const image of images) {
        await deleteFromCloudinary(image.public_id);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Product deleted Successfylly")
        )
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        let product = await Product.findById(req.params.id);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        const newImages = []; // for new images

        // updating details
        product.name = (name && name.trim() !== "") ? name : product.name;
        product.description = (description && description.trim() !== "") ? description : product.description;
        product.price = (price) ? price : product.price;
        product.category = (category && category.trim() !== "") ? category : product.category;
        product.stock = (stock) ? stock : product.stock;

        await product.save();

        if (req.files['product-images']) { // if new images present, deleting old images and uploading new one
            const oldImages = product.images;

            for (const image of oldImages) {
                await deleteFromCloudinary(image.public_id);
            }

            // uploading new images
            for (const image of req.files['product-images']) {
                const uploadedImage = await uploadOnCloudinary(image);
                newImages.push({
                    public_id: uploadedImage.public_id,
                    public_url: uploadedImage.url
                })
            }
        }

        if (newImages.length !== 0) {
            product.images = newImages;
        }

        await product.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Product updated successfully", { product })
            )
    } catch (error) {
        if (req.files && req.files['product-images']) {
            for (const image of req.files['product-images']) {
                fs.unlink(image.path, (error) => { });
            }
        }

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        throw new ApiError(statusCode, message);
    }
})


export {
    getAllProducts,
    productDetails,
    createProductReview,
    deleteReview,
    getProductReviews,

    createProduct,
    getAdminProducts,
    deleteProduct,
    updateProduct,
}