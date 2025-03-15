import { Router } from 'express';
import adminRoutes from '../modules/admin/admin.routes.js';
import bookingRoutes from '../modules/booking/booking.routes.js';
import cartRoutes from '../modules/cart/cart.routes.js';
import menuRoutes from '../modules/menu/menu.routes.js';
import orderRoutes from '../modules/order/order.routes.js';
import paymentRoutes from '../modules/payment/payment.routes.js';
import tableRoutes from '../modules/table/table.routes.js';
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
    path: '/tables',
    routes: tableRoutes,
  },

  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/admins',
    routes: adminRoutes,
  },
  {
    path: '/carts',
    routes: cartRoutes,
  },
  {
    path: '/payments',
    routes: paymentRoutes,
  },
  {
    path: '/orders',
    routes: orderRoutes,
  },
];

// Applying routes to the router

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
