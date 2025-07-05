import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import {
    getMyOrders,
    getOneOrder,
    makeOrder,
} from '../controllers/order.controller.js';


const router = Router();

router.route('/create-order').post(verifyJWT, makeOrder);
router.route('/my-orders').get(verifyJWT, getMyOrders);
router.route('/single-order/:id').get(verifyJWT, getOneOrder);

export default router;