import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  toolId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  userPhoto: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhoto: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

reviewSchema.index({ toolId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', reviewSchema);
