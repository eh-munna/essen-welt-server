import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import {
  deleteCart,
  deleteItem,
  getCart,
  handleCreateCart,
} from './cart.controller.js';

const router = Router();

router.post('/', handleCreateCart);

router.get('/', verifyToken, verifyUser, getCart);

router.delete('/:itemId', deleteItem);

router.delete('/', deleteCart);

const cartRoutes = router;

export default cartRoutes;
