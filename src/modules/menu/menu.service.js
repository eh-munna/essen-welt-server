// import Menu from './menu.model.js';

// const createMenu = async (payload) => {
//   const result = await Menu.create(payload);
//   return result;
// };

// const findMenus = async (query) => {
//   const menus = await Menu.find(query);
//   const categories = await Menu.distinct('category');
//   return { menus, categories };
// };

// const findPopularMenus = async () => {
//   const popularMenus = await Menu.find({ popular: true });
//   return popularMenus;
// };

// const findMenu = async (id) => {
//   const menu = await Menu.findById(id);
//   return menu;
// };

// const findCartMenus = async (payload) => {
//   const cartItems = await Menu.find({ _id: { $in: payload } });
//   return cartItems;
// };

// export { createMenu, findCartMenus, findMenu, findMenus, findPopularMenus };

import AppError from '../../error/AppError.js';
import Menu from './menu.model.js';

const createMenu = async (payload) => {
  const result = await Menu.create(payload);
  return result;
};

const findMenus = async (query) => {
  const menus = await Menu.find(query);
  const categories = await Menu.distinct('category');
  return { menus, categories };
};

const findPopularMenus = async () => {
  const popularMenus = await Menu.find({ popular: true });
  return popularMenus;
};

const findMenu = async (id) => {
  const menu = await Menu.findById(id);
  return menu;
};

const findCartMenus = async (payload) => {
  const cartItems = await Menu.find({ _id: { $in: payload } });
  return cartItems;
};

const findAndDeleteMenu = async (id) => {
  const deleteResult = await Menu.deleteOne({ _id: id });

  if (!deleteResult?.deletedCount) {
    throw new AppError(404, 'Menu not found');
  }

  return deleteResult?.deletedCount;
};

const findAndUpdateMenu = async (payload) => {
  const updateResult = await Menu.findByIdAndUpdate(
    payload?.id,
    payload?.updates,
    { new: true }
  );

  if (!updateResult) {
    throw new AppError(404, 'Menu not found');
  }

  return updateResult;
};

export {
  createMenu,
  findAndDeleteMenu,
  findAndUpdateMenu,
  findCartMenus,
  findMenu,
  findMenus,
  findPopularMenus,
};
