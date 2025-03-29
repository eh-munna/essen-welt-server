import mongoose from 'mongoose';

import AppError from '../../error/AppError.js';
import { handleBookingData } from '../../utils/bookingUtils.js';
import { findAvailableTable } from '../table/table.service.js';
import User from '../user/user.model.js';
import Booking from './booking.model.js';

const createBooking = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { startTime, endTime, numberOfPeople } = handleBookingData(
      payload?.date,
      payload?.startTime,
      payload?.endTime,
      payload?.numberOfPeople
    );

    const tables = await findAvailableTable(numberOfPeople, startTime, endTime);

    if (!tables || tables.length === 0) {
      throw new AppError(
        400,
        'No suitable tables found for the given number of people.'
      );
    }

    const booking = await Booking.create(
      [
        {
          ...payload,
          startTime: startTime,
          endTime: endTime,
          numberOfPeople,
          tableId: tables?.map((table) => table?._id), // Handling multiple table IDs
          tableNumber: tables?.map((table) => table?.tableNumber), // Handling multiple table IDs
        },
      ],
      {
        session,
      }
    );
    await session.commitTransaction();
    session.endSession();
    return booking;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
};

// const findBookings = async (payload) => {
//   const { email, bookingCode } = payload;

//   if (!email || !bookingCode) {
//     throw new AppError(400, 'Email and booking code are required');
//   }

//   let filter;
//   let bookings;

//   const existingUser = await User.findOne({ email: payload?.email });

//   console.log(existingUser);
//   if (existingUser?.role === 'customer') {
//     filter = { email: email };
//   } else {
//     filter = { email: email, bookingCode: bookingCode };
//   }

//   const existingBooking = await Booking.findOne({
//     email: email,
//     bookingCode: bookingCode,
//   });

//   if (existingBooking) {
//     bookings = await Booking.find(filter);
//   }

//   bookings = await Booking.find(filter);

//   return bookings;
// };

const findBookings = async (payload) => {
  let bookings = [];

  if (!payload?.email) {
    bookings = await Booking.find();
  } else {
    bookings = await Booking.find({ email: payload?.email });
  }

  if (!bookings?.length) return [];
  return bookings;
};

const findAndUpdateBooking = async (payload) => {
  const { id, updates } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { startTime, endTime, numberOfPeople } = handleBookingData(
      updates?.date,
      updates?.startTime,
      updates?.endTime,
      updates?.numberOfPeople
    );
    const tables = await findAvailableTable(numberOfPeople, startTime, endTime);

    if (!tables || tables.length === 0) {
      throw new AppError(
        400,
        'No suitable tables found for the given number of people.'
      );
    }

    const modifiedUpdates = {
      ...updates,
      startTime: startTime,
      endTime: endTime,
      numberOfPeople: numberOfPeople,
      tableId: tables?.map((table) => table?._id),
      tableNumber: tables?.map((table) => table?.tableNumber),
    };

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      modifiedUpdates,
      {
        new: true,
        session,
      }
    );
    await session.commitTransaction();
    session.endSession();
    return updatedBooking;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
};

const findAndDeleteBooking = async (payload) => {
  let filter;
  const { id, user, guest } = payload;

  const existingUser = await User.isExists(user?.email);

  if (existingUser?.role === 'admin') {
    filter = { _id: id };
  } else if (existingUser?.role === 'customer') {
    filter = { _id: id, email: user?.email };
  } else if (guest?.email) {
    filter = { _id: id, email: guest?.email };
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findOne(filter).session(session);

    if (!booking) {
      throw new AppError(403, 'You are not authorized to perform this action.');
    }

    const deletedBooking = await Booking.findByIdAndDelete(id, { session });

    console.log(deletedBooking?.deletedCount);

    if (!deletedBooking) {
      throw new AppError(404, 'Booking not found');
    }
    await session.commitTransaction();
    session.endSession();
    return 1;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
};

export {
  createBooking,
  findAndDeleteBooking,
  findAndUpdateBooking,
  findBookings,
};
