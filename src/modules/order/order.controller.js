import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { createOrder, findOrders } from './order.service.js';

const handleCreateOrder = asyncTryCatch(async (req, res) => {
  const order = await createOrder(req.body);
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

const getOrders = asyncTryCatch(async (req, res) => {
  const orders = await findOrders(req?.user);
  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

export { getOrders, handleCreateOrder };
