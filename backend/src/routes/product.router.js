import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { 
    createProduct,
    createProductReview,
    deleteProduct,
    deleteReview,
    getAdminProducts,
    getAllProducts,
    getProductReviews,
    productDetails,
    updateProduct,
} from '../controllers/product.controller.js';


const router = Router();

router.route('/all-products').get(getAllProducts);
router.route('/details/:id').get(productDetails);
router.route('/review')
    .post(verifyJWT, createProductReview)
    .delete(verifyJWT, deleteReview)
    router.route('/reviews/:id').get(getProductReviews);


// Admin routes
router.route('/new-product').post(
        verifyJWT,
        authorizeRoles("admin"),
        upload.fields([{ name: "product-images", maxCount: 4 }]),
        createProduct);
router.route('/admin-products').get(verifyJWT, authorizeRoles("admin"), getAdminProducts);
router.route('/delete/:id').delete(verifyJWT, authorizeRoles("admin"), deleteProduct);
router.route('/update-product/:id').put(
    verifyJWT,
    authorizeRoles("admin"),
    upload.fields([{name: 'product-images', maxCount: 4}]),
    updateProduct);



export default router;