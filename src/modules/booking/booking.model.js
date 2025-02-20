import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },

  date: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  message: {
    type: String,
  },
});

const Booking = model('Booking', bookingSchema);
export default Booking;
