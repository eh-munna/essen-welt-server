import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { paymentIntent } from './payment.service.js';

const handlePaymentIntent = asyncTryCatch(async (req, res) => {
  const clientSecret = await paymentIntent(req.body);
  res.status(200).json({
    success: true,
    message: 'Payment intent created successfully',
    data: clientSecret,
  });
});

export { handlePaymentIntent };
