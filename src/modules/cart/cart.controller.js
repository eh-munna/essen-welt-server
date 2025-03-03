import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createCart,
  findAndDeleteCart,
  findAndDeleteItem,
  findCart,
} from './cart.service.js';

const handleCreateCart = asyncTryCatch(async (req, res) => {
  const cart = await createCart(req.body);
  const message = cart.map((cartItem) => cartItem?.message).join(', ');

  res.status(201).json({
    success: true,
    message: message,
    data: cart,
  });
});
const getCart = asyncTryCatch(async (req, res) => {
  const cart = await findCart(req?.query);

  res.status(200).json({
    success: true,
    message: 'Cart fetched successfully',
    data: cart,
  });
});

const deleteItem = asyncTryCatch(async (req, res) => {
  const itemId = req?.params?.itemId;

  const deletedCount = await findAndDeleteItem(itemId);

  res.status(200).json({
    success: true,
    message: `${deletedCount} item(s) deleted from the cart`,
    data: deletedCount || 0,
  });
});

const deleteCart = asyncTryCatch(async (req, res) => {
  const deletedCount = await findAndDeleteCart(req?.query);
  res.status(200).json({
    success: true,
    message: `Cart deleted successfully. ${deletedCount} item(s) deleted`,
    data: deletedCount || 0,
  });
});

export { deleteCart, deleteItem, getCart, handleCreateCart };
