import Menu from './menu.model.js';

const createMenu = async (payload) => {
  const result = await Menu.create(payload);
  return result;
};

const findMenus = async () => {
  const result = await Menu.find();
  return result;
};

export { createMenu, findMenus };
