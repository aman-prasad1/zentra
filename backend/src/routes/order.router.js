import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import {
    getAllOrders,
    getMyOrders,
    getOneOrder,
    makeOrder,
    ordersByUser,
    updateOrderStatus,
    verifyOrderPayment,
} from '../controllers/order.controller.js';


const router = Router();

router.route('/create-order').post(verifyJWT, makeOrder);
router.route('/verify-payment').post(verifyJWT, verifyOrderPayment);
router.route('/my-orders').get(verifyJWT, getMyOrders);
router.route('/single-order/:id').get(verifyJWT, getOneOrder);

// admin routes
router.route('/all-orders').get(verifyJWT, authorizeRoles("admin"), getAllOrders);
router.route('/user-orders/:id').get(verifyJWT, authorizeRoles("admin"), ordersByUser);
router.route('/update-order/:id').put(verifyJWT, authorizeRoles("admin"), updateOrderStatus);

export default router;