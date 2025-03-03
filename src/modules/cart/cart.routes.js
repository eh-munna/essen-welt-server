import { Router } from 'express';
import {
  deleteCart,
  deleteItem,
  getCart,
  handleCreateCart,
} from './cart.controller.js';

const router = Router();

router.post('/', handleCreateCart);

router.get('/', getCart);

router.delete('/:itemId', deleteItem);

router.delete('/', deleteCart);

const cartRoutes = router;

export default cartRoutes;
