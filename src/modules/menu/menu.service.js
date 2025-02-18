import Menu from './menu.model.js';

const createMenu = async (payload) => {
  const result = await Menu.create(payload);
  return result;
};

const findMenus = async (query) => {
  const result = await Menu.find(query);
  return result;
};

export { createMenu, findMenus };
