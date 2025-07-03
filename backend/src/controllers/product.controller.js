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
    
        if(req.files['product-images'].length === 0) {
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
        // removing all images saved to public folder
        for(const image of req.files['product-images']) {
            fs.unlink(image.path, (error) => {});
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

export {
    createProduct,
    getAllProducts,
    getAdminProducts,
}