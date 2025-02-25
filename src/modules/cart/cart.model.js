import mongoose, { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },

  customer: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const Cart = model('cart', cartSchema);
export default Cart;
