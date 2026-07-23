import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  photoURL: string;
  role: 'user' | 'admin';
  isPro: boolean;
  authProvider: 'local' | 'google';
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  photoURL: { type: String, default: 'https://via.placeholder.com/150' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isPro: { type: Boolean, default: false },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', userSchema);
