import { Router } from 'express';
import { handlePaymentIntent } from './payment.controller.js';

const router = Router();

router.post('/create-payment-intent', handlePaymentIntent);

const paymentRoutes = router;

export default paymentRoutes;
