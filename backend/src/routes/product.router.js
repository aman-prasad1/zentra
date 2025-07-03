import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { 
    createProduct,
    deleteProduct,
    getAdminProducts,
    getAllProducts,
    productDetails,
} from '../controllers/product.controller.js';


const router = Router();

// product routes
router.route('/new-product').post(
        verifyJWT,
        authorizeRoles("admin"),
        upload.fields([{ name: "product-images", maxCount: 4 }]),
        createProduct);

router.route('/all-products').get(getAllProducts);
router.route('/admin-products').get(verifyJWT, authorizeRoles("admin"), getAdminProducts);
router.route('/details/:id').get(productDetails);
router.route('/delete/:id').delete(verifyJWT, authorizeRoles("admin"), deleteProduct);


export default router;