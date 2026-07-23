import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  pricing: string;
  website: string;
  thumbnail: string;
  tags: string[];
  features: string[];
  avgRating: number;
  totalReviews: number;
  bookmarkCount: number;
  isFeatured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: mongoose.Types.ObjectId;
  rejectionFeedback?: string;
  aiModel?: string;
  company?: string;
  foundedYear?: number;
  history?: string;
  createdAt: Date;
}

const toolSchema = new Schema<ITool>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  category: { type: String, required: true },
  pricing: { type: String, required: true },
  website: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: [{ type: String }],
  features: [{ type: String }],
  avgRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  bookmarkCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rejectionFeedback: { type: String },
  aiModel: { type: String },
  company: { type: String },
  foundedYear: { type: Number },
  history: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITool>('Tool', toolSchema);
