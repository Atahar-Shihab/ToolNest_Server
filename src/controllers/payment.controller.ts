import { Request, Response } from 'express';
import Stripe from 'stripe';
import Payment from '../models/Payment';
import User from '../models/User';

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY || '';
  return new Stripe(secretKey, { apiVersion: '2023-08-16' });
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500, // $5.00
      currency: 'usd',
      metadata: { userId: req.user?.userId as string }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Failed to create payment intent', error: error.message || error });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.body;
    
    await User.findByIdAndUpdate(req.user?.userId, { isPro: true });
    
    const payment = new Payment({
      userId: req.user?.userId,
      userEmail: req.user?.email,
      amount: 5.00,
      transactionId,
      status: 'succeeded'
    });
    await payment.save();

    res.json({ message: 'Payment confirmed and account upgraded', payment });
  } catch (error: any) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};
