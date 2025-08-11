import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (fileInput) => {
    try {
        if (!fileInput) return null
        
        // Handle both file path (local) and buffer (production)
        if (typeof fileInput === 'string') {
            // File path - for local development
            const response = await cloudinary.uploader.upload(fileInput, {
                resource_type: "auto"
            })
            fs.unlinkSync(fileInput)
            return response;
        } else if (Buffer.isBuffer(fileInput.buffer)) {
            // Buffer - for production/memory storage
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "avatars" // Optional: organize uploads in folders
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                ).end(fileInput.buffer);
            });
        } else {
            throw new Error('Invalid file input type');
        }

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        // Only try to unlink if it's a file path
        if (typeof fileInput === 'string') {
            try {
                fs.unlinkSync(fileInput);
            } catch (unlinkError) {
                console.error('Error unlinking file:', unlinkError);
            }
        }
        return null;
    }
}

const deleteFromCloudinary = async (public_id) => {
    try {
        // Deleting image from cloudinary
        const response = await cloudinary.uploader.destroy(public_id);

        return response;
    } catch {
        return null;
    }
}


export {uploadOnCloudinary, deleteFromCloudinary};