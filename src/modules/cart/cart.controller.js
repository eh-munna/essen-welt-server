import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { createCart, findCart } from './cart.service.js';

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
  const cart = await findCart();

  res.status(201).json({
    success: true,
    message: 'Cart fetch successfully',
    data: cart,
  });
});

export { getCart, handleCreateCart };
