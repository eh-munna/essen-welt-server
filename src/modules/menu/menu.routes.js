import { Router } from 'express';
import { getMenus, handleCreateMenu } from './menu.controller.js';

const router = Router();

// Define routes for menu
router.post('/', handleCreateMenu);

router.get('/', getMenus);
const menuRoutes = router;
export default menuRoutes;
