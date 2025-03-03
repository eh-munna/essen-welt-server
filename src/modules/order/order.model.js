import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Menu',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        priceAtOrder: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },

    paymentMethod: {
      type: String,
      enum: ['card', 'other-method'],
      default: 'card',
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

orderSchema.statics.isDuplicateOrder = async function (paymentIntentId) {
  const order = await this.findOne({ paymentIntentId });
  return order;
};
const Order = model('Order', orderSchema);
export default Order;
