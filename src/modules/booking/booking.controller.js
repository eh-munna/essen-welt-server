import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createBooking,
  findAndDeleteBooking,
  findAndUpdateBooking,
  findBookings,
} from './booking.service.js';

const handleCreateBooking = asyncTryCatch(async (req, res) => {
  const booking = await createBooking(req.body);
  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
});

// const getBookings = asyncTryCatch(async (req, res) => {
//   const bookings = await findBookings(req.query);

//   res.status(200).json({
//     success: true,
//     message: 'Bookings fetched successfully',
//     data: bookings,
//   });
// });

const getBookings = asyncTryCatch(async (req, res) => {
  const bookings = await findBookings(req.query);
  res.status(200).json({
    success: true,
    message: 'Bookings fetched successfully',
    data: bookings,
  });
});

const updateBooking = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedBooking = await findAndUpdateBooking({ id, updates });
  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: updatedBooking,
  });
});

const deleteBooking = asyncTryCatch(async (req, res) => {
  const { id } = req.params;

  const deletedCount = await findAndDeleteBooking({
    id,
    user: req?.user,
    guest: req?.body,
  });
  res.status(200).json({
    success: true,
    message: `${deletedCount} booking(s) deleted successfully`,
  });
});

export { deleteBooking, getBookings, handleCreateBooking, updateBooking };
