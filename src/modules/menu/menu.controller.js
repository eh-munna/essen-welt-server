// import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
// import {
//   createMenu,
//   findCartMenus,
//   findMenu,
//   findMenus,
//   findPopularMenus,
// } from './menu.service.js';

// const handleCreateMenu = asyncTryCatch(async (req, res) => {
//   const menu = await createMenu(req.body);

//   res.status(201).json({
//     success: true,
//     message: 'Menu created successfully',
//     data: menu,
//   });
// });

// const getMenus = asyncTryCatch(async (req, res) => {
//   const query = req.query;
//   const menu = await findMenus(query);

//   res.status(201).json({
//     success: true,
//     message: 'Menus fetched successfully',
//     data: menu,
//   });
// });

// const getPopularMenus = asyncTryCatch(async (req, res) => {
//   const popularMenus = await findPopularMenus();

//   res.status(200).json({
//     success: true,
//     message: 'Popular menus fetched successfully',
//     data: popularMenus,
//   });
// });

// const getMenu = asyncTryCatch(async (req, res) => {
//   const { id } = req.params;

//   const menu = await findMenu(id);

//   if (!menu) {
//     return res.status(404).json({
//       success: false,
//       message: 'Menu not found',
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Menu fetched successfully',
//     data: menu,
//   });
// });

// const getCartMenus = asyncTryCatch(async (req, res) => {
//   const { ids } = req.body;
//   const cartMenus = await findCartMenus(ids);

//   res.status(200).json({
//     success: true,
//     message: 'Cart menus fetched successfully',
//     data: cartMenus,
//   });
// });

// export { getCartMenus, getMenu, getMenus, getPopularMenus, handleCreateMenu };

import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createMenu,
  findAndDeleteMenu,
  findAndUpdateMenu,
  findCartMenus,
  findMenu,
  findMenus,
  findPopularMenus,
} from './menu.service.js';

const handleCreateMenu = asyncTryCatch(async (req, res) => {
  const menu = await createMenu(req.body);
  res.status(201).json({
    success: true,
    message: 'Menu created successfully',
    data: menu,
  });
});

const getMenus = asyncTryCatch(async (req, res) => {
  const query = req.query;
  const menu = await findMenus(query);

  res.status(201).json({
    success: true,
    message: 'Menus fetched successfully',
    data: menu,
  });
});

const getPopularMenus = asyncTryCatch(async (req, res) => {
  const popularMenus = await findPopularMenus();

  res.status(200).json({
    success: true,
    message: 'Popular menus fetched successfully',
    data: popularMenus,
  });
});

const getMenu = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
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
});

const getCartMenus = asyncTryCatch(async (req, res) => {
  const { ids } = req.body;
  const cartMenus = await findCartMenus(ids);

  res.status(200).json({
    success: true,
    message: 'Cart menus fetched successfully',
    data: cartMenus,
  });
});

const deleteMenu = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const deletedCount = await findAndDeleteMenu(id);

  res.status(200).json({
    success: true,
    message: `${deletedCount} menu(s) deleted successfully`,
  });
});

const updateMenu = asyncTryCatch(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedMenu = await findAndUpdateMenu({ id, updates });

  res.status(200).json({
    success: true,
    message: 'Menu updated successfully',
    data: updatedMenu,
  });
});

export {
  deleteMenu,
  getCartMenus,
  getMenu,
  getMenus,
  getPopularMenus,
  handleCreateMenu,
  updateMenu,
};
