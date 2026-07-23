import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  toolId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true },
  createdAt: { type: Date, default: Date.now }
});

bookmarkSchema.index({ userId: 1, toolId: 1 }, { unique: true });

export default mongoose.model<IBookmark>('Bookmark', bookmarkSchema);
