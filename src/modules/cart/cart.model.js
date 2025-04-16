import mongoose, { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },

  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
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

  totalPrice: {
    type: Number,
    default: 0,
  },
});

const Cart = model('cart', cartSchema);
export default Cart;
