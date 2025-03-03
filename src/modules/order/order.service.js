import mongoose from 'mongoose';
import Cart from '../cart/cart.model.js';
import Order from './order.model.js';

const createOrder = async (payload) => {
  // return payload;
  const isOrderExists = await Order.isDuplicateOrder(payload?.paymentIntentId);
  if (isOrderExists)
    throw new AppError(409, 'Order with this payment intent ID already exists');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const order = await Order.create([payload], { session });
    if (!order.length) throw new AppError(500, 'Order creation failed');

    const deleteResult = await Cart.deleteMany({
      customer: payload?.customer,
    });
    if (deleteResult.deletedCount === 0) {
      console.warn(`No cart items found for customer`);
    }

    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const findOrders = async (payload) => {
  const orders = await Order.find()
    .populate({
      path: 'customer',
      match: { email: payload?.email },
      select: 'email name',
    })

    .populate({
      path: 'items',
      populate: {
        path: 'itemId',
        match: { _id: payload?.itemId },
        select: 'name',
      },
    })
    .lean();

  const transformedOrders = orders?.map((order) => {
    order.items = order.items.map((item) => ({
      name: item.itemId?.name,
      quantity: item.quantity,
      priceAtOrder: item.priceAtOrder,
    }));
    return order;
  });
  return transformedOrders;
};

export { createOrder, findOrders };
