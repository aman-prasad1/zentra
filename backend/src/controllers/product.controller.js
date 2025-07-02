import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js';
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
                new ApiResponse(200, product, )
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


export {
    createProduct,
}