import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { createCart, findAndDeleteItem, findCart } from './cart.service.js';

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
  const user = req?.user;

  if (!user || !user?.email) {
    throw new AppError(401, 'Unauthorized'); // User not authenticated or invalid token. Return 401 Unauthorized.
  }

  if (!req?.query?.email || req?.query?.email !== user?.email) {
    throw new AppError(403, 'Invalid email'); // Return 400 Bad Request if email is missing in query parameters.
  }

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

export { deleteItem, getCart, handleCreateCart };
