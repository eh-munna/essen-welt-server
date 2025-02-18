import { createMenu, findMenus } from './menu.service.js';

const handleCreateMenu = async (req, res, next) => {
  try {
    const menu = await createMenu(req.body);
    res.status(201).json(menu);
  } catch (error) {
    next(error);
  }
};
const getMenus = async (req, res, next) => {
  const query = req.query;
  try {
    const menu = await findMenus(query);
    res.status(201).json(menu);
  } catch (error) {
    next(error);
  }
};

export { getMenus, handleCreateMenu };
