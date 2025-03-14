import { Schema, model } from 'mongoose';

const tableSchema = new Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const Table = model('Table', tableSchema);
export default Table;
