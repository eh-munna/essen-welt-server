import { Router } from 'express';
import { verifyAdmin } from '../../middlewares/verifyAdmin.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import {
  deleteBooking,
  getBookings,
  getCustomerBookings,
  handleCreateBooking,
  updateBooking,
} from './booking.controller.js';

const router = Router();

router.post('/', handleCreateBooking);

router.get('/', verifyToken, getBookings);

router.get('/admin/:email', verifyToken, verifyAdmin, getCustomerBookings);

router.put('/admin/:id', verifyToken, verifyAdmin, updateBooking);

router.delete('/:id', deleteBooking);

const bookingRoutes = router;

export default bookingRoutes;
