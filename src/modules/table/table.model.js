import { Schema, model } from 'mongoose';

const tableSchema = new Schema({
  status: {
    type: String,
    enum: ['booked', 'available'],
  },
});

const Table = model('Table', tableSchema);
export default Table;
