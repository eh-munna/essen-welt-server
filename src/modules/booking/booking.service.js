import mongoose from 'mongoose';

import AppError from '../../error/AppError.js';
import { handleBookingData } from '../../utils/bookingUtils.js';
import { findAvailableTable } from '../table/table.service.js';
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

const findBookings = async (payload) => {
  const filter = payload?.email ? payload.email : {};
  const bookings = await Booking.find(filter);
  return bookings;
};

const findCustomerBookings = async (payload) => {
  const bookings = await Booking.find({ email: payload?.email });

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

    console.log(numberOfPeople);

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

  // const updates = {
  //   ...payload?.updates,
  // }

  // const booking = await Booking.findByIdAndUpdate(
  //   payload?.id,
  //   payload?.updates,
  //   { new: true }
  // );
};

export {
  createBooking,
  findAndUpdateBooking,
  findBookings,
  findCustomerBookings,
};
