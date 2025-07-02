import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { createProduct } from '../controllers/product.controller.js';


const router = Router();

// product routes
router.route('/new-product').post(
        verifyJWT,
        authorizeRoles("admin"),
        upload.fields([{ name: "product-images", maxCount: 4 }]),
        createProduct);




export default router;