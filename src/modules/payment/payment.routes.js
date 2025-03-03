import { Router } from 'express';
import { getPaymentIntent, handlePaymentIntent } from './payment.controller.js';

const router = Router();

router.post('/create-payment-intent', handlePaymentIntent);
router.get('/retrieve-payment-intent/:paymentIntentId', getPaymentIntent);

const paymentRoutes = router;

export default paymentRoutes;
