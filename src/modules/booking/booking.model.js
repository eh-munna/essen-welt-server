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
    type: Date,
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  message: {
    type: String,
  },

  tableId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },
  ],
  tableNumber: [
    {
      type: Number,
    },
  ],
});

const Booking = model('Booking', bookingSchema);
export default Booking;
