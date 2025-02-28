import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { deleteItem, getCart, handleCreateCart } from './cart.controller.js';

const router = Router();

router.post('/', handleCreateCart);

router.get('/', verifyToken, getCart);

router.delete('/:itemId', deleteItem)

const cartRoutes = router;

export default cartRoutes;
