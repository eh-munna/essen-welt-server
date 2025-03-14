import { Router } from 'express';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import { getOrders, handleCreateOrder } from './order.controller.js';

const router = Router();

router.post('/', handleCreateOrder);
router.get('/', verifyToken, verifyUser, getOrders);
router.get('/admin', verifyToken, verifyAdmin, getOrders);

const orderRoutes = router;
export default orderRoutes;
