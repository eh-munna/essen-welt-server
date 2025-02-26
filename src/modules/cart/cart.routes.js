import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { getCart, handleCreateCart } from './cart.controller.js';

const router = Router();

router.post('/', handleCreateCart);

router.get('/', verifyToken, getCart);

const cartRoutes = router;

export default cartRoutes;
