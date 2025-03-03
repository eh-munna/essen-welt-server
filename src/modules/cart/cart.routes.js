import { Router } from 'express';
import { validateUserEmail } from '../../middlewares/validateUserEmail.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import {
  deleteCart,
  deleteItem,
  getCart,
  handleCreateCart,
} from './cart.controller.js';

const router = Router();

router.post('/', handleCreateCart);

router.get('/', verifyToken, validateUserEmail, getCart);

router.delete('/:itemId', deleteItem);

router.delete('/', deleteCart);

const cartRoutes = router;

export default cartRoutes;
