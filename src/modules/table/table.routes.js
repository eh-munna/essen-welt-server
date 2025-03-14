import { Router } from 'express';
import { handleCreateTable } from './table.controller.js';

const router = Router();

router.post('/', handleCreateTable);

const tableRoutes = router;

export default tableRoutes;
