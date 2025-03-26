import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { paymentIntent, retrievePaymentIntent } from './payment.service.js';

const handlePaymentIntent = asyncTryCatch(async (req, res) => {
  console.log(req.body);
  const result = await paymentIntent(req.body);
  res.status(200).json({
    success: true,
    message: 'Payment intent created successfully',
    data: {
      clientSecret: result?.clientSecret,
      paymentIntentId: result?.paymentIntentId,
      amount: result?.amount,
    },
  });
});

const getPaymentIntent = asyncTryCatch(async (req, res) => {
  const { paymentIntentId } = req.params;
  const result = await retrievePaymentIntent(paymentIntentId);
  res.status(200).json({
    success: true,
    message: 'Payment intent retrieved successfully',
    data: {
      clientSecret: result?.clientSecret,
      paymentIntentId: result?.paymentIntentId,
      amount: result?.amount,
    },
  });
});

export { getPaymentIntent, handlePaymentIntent };
