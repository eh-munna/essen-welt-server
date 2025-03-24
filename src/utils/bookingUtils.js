import AppError from '../error/AppError.js';
import { businessHours } from '../modules/booking/booking.constant.js';
import { convertToDayDate } from './convertToDayDate.js';

export const handleBookingData = (
  date,
  startTime,
  endTime,
  numberOfPeople
) => {
  const { open, close } = businessHours;

  startTime = convertToDayDate(date, startTime);
  endTime = convertToDayDate(date, endTime);
  numberOfPeople = Number(numberOfPeople);

  const openingTime = convertToDayDate(date, open);
  const closingTime = convertToDayDate(date, close);

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

  return { startTime, endTime, numberOfPeople };
};
