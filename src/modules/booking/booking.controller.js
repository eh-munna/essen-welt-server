import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { createBooking } from './booking.service.js';

const handleCreateBooking = asyncTryCatch(async (req, res) => {
  const booking = await createBooking(req.body);
  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
});

export { handleCreateBooking };
