import { Router } from 'express';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { authLogin, authLogout } from '../auth/auth.controller.js';
import {
  deleteUser,
  getCustomer,
  getUsers,
  handleCreateUser,
} from './user.controller.js';

const router = Router();

router.post('/', handleCreateUser);

router.get('/', verifyToken, getCustomer);

router.get('/admin', verifyToken, verifyAdmin, getUsers);

router.post('/auth-login', authLogin);

router.post('/auth-logout', authLogout);

router.delete('/:id', deleteUser);

const userRoutes = router;
export default userRoutes;
