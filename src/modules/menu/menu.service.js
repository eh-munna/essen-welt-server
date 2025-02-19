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

const findMenu = async (id) => {
  const menu = await Menu.findById(id);
  return menu;
};

export { createMenu, findMenus, findMenu };
