import { Router } from 'express';
import { handleCreateBooking } from './booking.controller.js';

const router = Router();

router.post('/', handleCreateBooking);

const bookingRoutes = router;

export default bookingRoutes;
