import { Router } from 'express';
import bookingRoutes from '../modules/booking/booking.routes.js';
import menuRoutes from '../modules/menu/menu.routes.js';

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
];

// Applying routes to the router

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
