import { Router } from 'express';
import { getCart, handleCreateCart } from './cart.controller.js';

const router = Router();

router.post('/', handleCreateCart);

router.get('/', getCart);

const cartRoutes = router;

export default cartRoutes;
