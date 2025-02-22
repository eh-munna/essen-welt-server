import { Router } from 'express';
import { handleCreateUser } from './user.controller.js';

const router = Router();

router.post('/', handleCreateUser);

const userRoutes = router;
export default userRoutes;
