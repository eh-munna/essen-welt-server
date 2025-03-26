import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createOrder,
  findAndDeleteOrder,
  findAndUpdate,
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
  const orders = await findOrders(req?.query);

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
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
  const { id } = req.params;
  const deletedCount = await findAndDeleteOrder(id);

  res.status(200).json({
    success: true,
    message: `${deletedCount} order(s) deleted successfully`,
  });
});

export { deleteOrder, getOrders, handleCreateOrder, updateOrder };
