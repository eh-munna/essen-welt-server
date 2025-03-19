import { Router } from 'express';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import {
  deleteMenu,
  getCartMenus,
  getMenu,
  getMenus,
  getPopularMenus,
  handleCreateMenu,
  updateMenu,
} from './menu.controller.js';

const router = Router();

// Admin routes
router.post('/admin', verifyToken, verifyAdmin, handleCreateMenu);
router.put('/admin/:id', verifyToken, verifyAdmin, updateMenu);
router.delete('/admin/:id', verifyToken, verifyAdmin, deleteMenu);

// Public routes
router.get('/', getMenus);
router.get('/popular', getPopularMenus);
router.post('/cart', getCartMenus);
router.get('/:id', getMenu);

const menuRoutes = router;
export default menuRoutes;
