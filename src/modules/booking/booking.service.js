import mongoose from 'mongoose';
import AppError from '../../error/AppError.js';
import { convertToDayDate } from '../../utils/convertToDayDate.js';
import { findAvailableTable } from '../table/table.service.js';
import { businessHours } from './booking.constant.js';
import Booking from './booking.model.js';

const createBooking = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { open, close } = businessHours;

    const startTime = convertToDayDate(payload?.date, payload?.startTime);
    const endTime = convertToDayDate(payload?.date, payload?.endTime);

    const openingTime = convertToDayDate(payload?.date, open);
    const closingTime = convertToDayDate(payload?.date, close);

    if (startTime < openingTime || endTime > closingTime) {
      throw new AppError(
        400,
        `Invalid booking time. The restaurant is open from ${open} to ${close}`
      );
    }

    if (startTime >= endTime) {
      throw new AppError(
        400,
        'Invalid booking time. Booking cannot end before or at the start time.'
      );
    }

    const tables = await findAvailableTable(
      Number(payload?.numberOfPeople),
      startTime,
      endTime
    );

    if (!tables || tables.length === 0) {
      throw new AppError(
        400,
        'No suitable tables found for the given number of people.'
      );
    }

    console.log(tables);

    const booking = await Booking.create(
      [
        {
          ...payload,
          startTime: startTime,
          endTime: endTime,
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

export { createBooking };
