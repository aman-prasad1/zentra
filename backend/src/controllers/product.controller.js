import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import fs from 'fs';


const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        
        // checking all fieds are present or not
        if([name, description, category].some(field => !field || field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }
        
        if(!price) {
            throw new ApiError(400, "Price is required");
        }
    
        if(!req.files['product-images']) {
            throw new ApiError(400, "Product Images are required");
        }

        const images = []; // for product images
        for(const image of req.files['product-images']) {
            const uploadImage = await uploadOnCloudinary(image.path);
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
                new ApiResponse(200, product, "Product Added Successfully")
            )


    } catch (error) {
        if(req.files['product-images']) {
            for(const image of req.files['product-images']) {
                fs.unlink(image.path, (error) => {});
            }
        }

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        throw new ApiError(statusCode, message);
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);


    let products = await apiFeature.query;
    let filteredProductCount = products.length;
    

    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                products,
                productCount,
                filteredProductCount,
                resultPerPage
            }, "Products Fetched")
        )
})

const getAdminProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    return res
        .status(200)
        .json(
            new ApiResponse(200, products, "All admin products fetched")
        )
})

const productDetails = asyncHandler(async (req, res) => {
    const productDetail = await Product.findById(req.params.id);

    if(!productDetail) {
        throw new ApiError(404, "Product not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, productDetail, "Product Details fetched Successfully")
        )
})

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        throw new ApiError(404, "Product not found");
    }

    const images = product.images; // saving product images id to delete form cloudinary

    await product.deleteOne(); // deleting product

    // deleting images from cloudinary
    for(const image of images) {
        await deleteFromCloudinary(image.public_id);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Product deleted Successfylly")
        )
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description, price, category, stock} = req.body;

        let product = await Product.findById(req.params.id);

        if(!product) {
            throw new ApiError(404, "Product not found");
        }
    
        const newImages = []; // for new images

        // updating details
        product.name = (name && name.trim() !== "")? name : product.name;
        product.description = (description && description.trim() !== "")? description : product.description;
        product.price = (price)? price : product.price;
        product.category = (category && category.trim() !== "")? category : product.category;
        product.stock = (stock)? stock : product.stock;

        await product.save();
        
        if(req.files['product-images']) { // if new images present, deleting old images and uploading new one
            const oldImages = product.images;
            
            for(const image of oldImages) {
                await deleteFromCloudinary(image.public_id);
            }
            
            // uploading new images
            for(const image of req.files['product-images']) {
                const uploadedImage = await uploadOnCloudinary(image.path);
                newImages.push({
                    public_id: uploadedImage.public_id,
                    public_url: uploadedImage.url
                })
            }
        }

        if(newImages.length !== 0) {
            product.images = newImages;
        }
    
        await product.save();
    
        return res
            .status(200)
            .json(
                new ApiResponse(200, product, "Product updated successfully")
            )
    } catch (error) {
        if(req.files && req.files['product-images']) {
            for(const image of req.files['product-images']) {
                fs.unlink(image.path, (error) => {});
            }
        }

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        throw new ApiError(statusCode, message);
    }
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment, productId } = req.body;

    if(isNaN(rating) || (rating < 1 || rating > 5)) {
        throw new ApiError(400, "Rating should be a number and in between range 1-5");
    }

    const product = await Product.findById(productId);

    if(!product) {
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
    for(const review of product.reviews) {
        totalRatingsCnt += review.rating;
    }

    product.ratings = (totalRatingsCnt / product.numberOfReviews);

    product.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, newReview, "Review Added Successfully")
        )
})

export {
    createProduct,
    getAllProducts,
    getAdminProducts,
    productDetails,
    deleteProduct,
    updateProduct,
    createProductReview,
}