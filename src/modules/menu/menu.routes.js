import { Router } from 'express';
import { getMenu, getMenus, handleCreateMenu } from './menu.controller.js';

const router = Router();

// Define routes for menu
router.post('/', handleCreateMenu);

router.get('/', getMenus);

router.get('/:id', getMenu);
const menuRoutes = router;
export default menuRoutes;
