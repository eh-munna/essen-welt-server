import Booking from './booking.model.js';

const createBooking = async (payload) => {
  let numberOfTables = 10;
  const maxPeoplePerTable = 4;
  const numberOfPeople = payload?.numberOfPeople;
  const requiredTables = numberOfPeople / maxPeoplePerTable;

  numberOfTables = numberOfTables / payload.numberOfPeople;

  const bookedTables = await Booking.countDocuments({
    date: payload.date,
    startTime: { $gte: payload.startTime, $lte: payload.endTime },
  });

  if (bookedTables >= numberOfTables) {
    throw new Error('All tables are booked for the selected time slot.');
  }

  const result = await Booking.create(payload);

  return result;
};

export { createBooking };
