import { Router } from 'express';
import bookingRoutes from '../modules/booking/booking.routes.js';
import menuRoutes from '../modules/menu/menu.routes.js';
import userRoutes from '../modules/user/user.routes.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/menus',
    routes: menuRoutes,
  },
  {
    path: '/bookings',
    routes: bookingRoutes,
  },

  {
    path: '/users',
    routes: userRoutes,
  },
];

// Applying routes to the router

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
