import Cart from './cart.model.js';

const createCart = async (payload) => {
  const results = [];

  const processItem = async (item) => {
    const existingItem = await Cart.findOne({
      customer: item.customer,
      itemId: item.itemId,
    });

    let result;

    if (existingItem) {
      const updatedItem = await Cart.findOneAndUpdate(
        { _id: existingItem?._id },
        { $inc: { quantity: item?.quantity ? item?.quantity : 1 } },
        { new: true }
      );
      result = {
        updatedItem,
        message: `${
          item?.quantity ? item?.quantity : 1
        } item(s) added to the cart`,
      };
      results.push(result);
    } else {
      const newItem = await Cart.create(item);
      result = {
        newItem,
        message: 'New item added to the cart',
      };
      results.push(result);
    }
  };
  if (Array.isArray(payload) && payload.length > 0) {
    await Promise.all(payload.map(processItem));
  } else {
    await processItem(payload);
  }
  return results;
};

const findCart = async (payload) => {
  const cart = await Cart.find({ customer: payload?.email });

  if (!cart.length) throw new AppError(404, 'No items found in the cart');

  return cart;
};

export { createCart, findCart };
