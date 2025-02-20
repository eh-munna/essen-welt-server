import { createBooking } from './booking.service.js';

const handleCreateBooking = async (req, res, next) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export { handleCreateBooking };
