import { Router } from 'express';
import { validateUserEmail } from '../../middlewares/validateUserEmail.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { getOrders, handleCreateOrder } from './order.controller.js';

const router = Router();

router.post('/', handleCreateOrder);
router.get('/', verifyToken, validateUserEmail, getOrders);

const orderRoutes = router;
export default orderRoutes;
