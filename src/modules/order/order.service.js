import mongoose from 'mongoose';
import AppError from '../../error/AppError.js';
import Cart from '../cart/cart.model.js';
import User from '../user/user.model.js';
import Order from './order.model.js';

const createOrder = async (payload) => {
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
  let orders = [];

  if (!payload?.email) {
    orders = await Order.find()
      .populate({
        path: 'items',
        populate: {
          path: 'itemId',
          select: 'name',
        },
      })
      .populate({
        path: 'customer',
        select: 'email name',
      })
      .lean();
  } else {
    const customer = await User.isExists(payload?.email);

    orders = await Order.find({ customer: customer?._id })
      .populate({
        path: 'items',
        populate: {
          path: 'itemId',
          select: 'name',
        },
      })
      .populate({
        path: 'customer',
        select: 'email name',
      })
      .lean();
  }

  const transformedOrders = orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      itemId: item.itemId?._id,
      name: item.itemId?.name,
      quantity: item.quantity,
      priceAtOrder: item.priceAtOrder,
    })),
  }));

  return transformedOrders;
};

const findAndUpdate = async (payload) => {
  const updateResult = await Order.findByIdAndUpdate(
    payload?.id,
    payload?.updates,
    { new: true }
  );
  if (!updateResult) {
    throw new AppError(404, 'Order not found');
  }
  return updateResult;
};

const findAndDeleteOrder = async (payload) => {
  const deleteResult = await Order.findByIdAndDelete(payload);
  if (!deleteResult) {
    throw new AppError(404, 'Order not found');
  }
  return 1;
};

export { createOrder, findAndDeleteOrder, findAndUpdate, findOrders };
