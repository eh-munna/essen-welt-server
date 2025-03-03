import { Router } from 'express';
import { authLogin, authLogout } from '../auth/auth.controller.js';
import { getUser, handleCreateUser } from './user.controller.js';

const router = Router();

router.post('/', handleCreateUser);

router.get('/', getUser);

router.post('/auth-login', authLogin);

router.post('/auth-logout', authLogout);

const userRoutes = router;
export default userRoutes;
