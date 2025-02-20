import {
  createMenu,
  findCartMenus,
  findMenu,
  findMenus,
  findPopularMenus,
} from './menu.service.js';

const handleCreateMenu = async (req, res, next) => {
  try {
    const menu = await createMenu(req.body);
    res.status(201).json({
      success: true,
      message: 'Menu created successfully',
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};
const getMenus = async (req, res, next) => {
  try {
    const query = req.query;
    const menu = await findMenus(query);
    res.status(201).json({
      success: true,

      message: 'Menus fetched successfully',
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

const getPopularMenus = async (req, res, next) => {
  try {
    const popularMenus = await findPopularMenus();

    res.status(200).json({
      success: true,
      message: 'Popular menus fetched successfully',
      data: popularMenus,
    });
  } catch (error) {
    next(error);
  }
};

const getMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await findMenu(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Menu fetched successfully',
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

const getCartMenus = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const cartMenus = await findCartMenus(ids);
    res.status(200).json({
      success: true,
      message: 'Cart menus fetched successfully',
      data: cartMenus,
    });
  } catch (error) {
    next(error);
  }
};

export { getCartMenus, getMenu, getMenus, getPopularMenus, handleCreateMenu };
