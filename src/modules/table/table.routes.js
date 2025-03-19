import { Router } from 'express';
import { requestValidation } from '../../middlewares/requestValidation.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import {
  deleteTable,
  getTables,
  handleCreateTable,
  updateTable
} from './table.controller.js';
import { tableCreateSchema } from './table.validation.js';

const router = Router();

router.post(
  '/admin',
  verifyToken,
  verifyAdmin,
  requestValidation(tableCreateSchema),
  handleCreateTable
);

router.get(`/admin`, verifyToken, verifyAdmin, getTables);

router.put(`/admin/:id`, verifyToken, verifyAdmin, updateTable);

router.delete(`/admin/:id`, verifyToken, verifyAdmin, deleteTable);

const tableRoutes = router;

export default tableRoutes;
