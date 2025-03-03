import { Router } from 'express';
import { getOrders, handleCreateOrder } from './order.controller.js';

const router = Router();

router.post('/', handleCreateOrder);
router.get('/', getOrders);

const orderRoutes = router;
export default orderRoutes;
