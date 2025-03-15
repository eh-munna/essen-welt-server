import { Router } from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { getAdmin } from './admin.controller.js';

const router = Router();

router.get('/', verifyToken, getAdmin);

const adminRoutes = router;
export default adminRoutes;
