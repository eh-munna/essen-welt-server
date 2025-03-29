import { Router } from 'express';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import {
  getOrders,
  handleCreateOrder,
  updateOrder,
} from './order.controller.js';

const router = Router();

router.post('/', verifyToken, handleCreateOrder);

router.get('/', verifyToken, verifyUser, getOrders);

router.get('/admin', verifyToken, verifyAdmin, getOrders);

router.put('/admin/:id', verifyToken, verifyAdmin, updateOrder);

const orderRoutes = router;
export default orderRoutes;
