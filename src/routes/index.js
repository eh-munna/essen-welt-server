import { Router } from 'express';
import menuRoutes from '../modules/menu/menu.routes.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/menus',
    routes: menuRoutes,
  },
];

// Applying routes to the router

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
