import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createOrder,
  findAndUpdate,
  findOrder,
  findOrders,
} from './order.service.js';

const handleCreateOrder = asyncTryCatch(async (req, res) => {
  const order = await createOrder(req.body);
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

const getOrders = asyncTryCatch(async (req, res) => {
  console.log(req?.url);
  const orders = await findOrders(req?.user);
  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

const getOrder = asyncTryCatch(async (req, res) => {
  const order = await findOrder(req.params);
  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

const updateOrder = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedOrder = await findAndUpdate({ id, updates });
  res.status(200).json({
    success: true,
    message: 'Order updated successfully',
    data: updatedOrder,
  });
});

const deleteOrder = asyncTryCatch(async (req, res) => {
  const deleteCount = await findAndDelete(req.params);

  res.status(200).json({
    success: true,
    message: `Order deleted successfully. Deleted count: ${deleteCount}`,
  });
});

export { deleteOrder, getOrder, getOrders, handleCreateOrder, updateOrder };
