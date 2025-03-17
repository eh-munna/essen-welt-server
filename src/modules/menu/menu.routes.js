import { Router } from 'express';
import {
  getCartMenus,
  getMenu,
  getMenus,
  getPopularMenus,
  handleCreateMenu,
} from './menu.controller.js';

const router = Router();

// Define routes for menu
router.post('/', handleCreateMenu);

router.get('/', getMenus);
router.get('/popular', getPopularMenus);

router.post('/cart', getCartMenus);

router.get('/:id', getMenu);
const menuRoutes = router;
export default menuRoutes;
