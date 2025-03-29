import { Router } from 'express';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

import { verifyUser } from '../../middlewares/verifyUser.js';
import {
  deleteBooking,
  getBookings,
  handleCreateBooking,
  updateBooking,
} from './booking.controller.js';

const router = Router();

router.post('/', handleCreateBooking);

router.get('/', getBookings);

router.get('/admin', verifyToken, verifyAdmin, getBookings);

router.put('/admin/:id', verifyToken, verifyAdmin, updateBooking);

router.put('/:id', verifyToken, verifyUser, updateBooking);

router.delete('/admin/:id', verifyToken, verifyAdmin, deleteBooking);

router.delete('/:id', verifyToken, verifyUser, deleteBooking);

const bookingRoutes = router;

export default bookingRoutes;
