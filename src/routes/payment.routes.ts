import { Router } from 'express';
import { createPaymentIntent, confirmPayment, getPayments } from '../controllers/payment.controller';
import { auth } from '../middleware/auth';
import { verifyAdmin } from '../middleware/verifyAdmin';

const router = Router();

router.post('/create-intent', auth, createPaymentIntent);
router.post('/confirm', auth, confirmPayment);
router.get('/', auth, verifyAdmin, getPayments);

export default router;
