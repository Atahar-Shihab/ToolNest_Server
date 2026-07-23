import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  amount: number;
  transactionId: string;
  status: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPayment>('Payment', paymentSchema);
