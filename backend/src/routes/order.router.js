import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import {
    makeOrder,
} from '../controllers/order.controller.js';


const router = Router();

router.route('/create-order').post(verifyJWT, makeOrder);

export default router;