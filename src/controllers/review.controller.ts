import { Request, Response } from 'express';
import Review from '../models/Review';
import Tool from '../models/Tool';
import mongoose from 'mongoose';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ toolId: req.params.toolId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ userId: req.user?.userId }).populate('toolId', 'title thumbnail');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { toolId, rating, comment, userName, userEmail, userPhoto } = req.body;
    
    const existing = await Review.findOne({ toolId, userId: req.user?.userId });
    if (existing) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'You have already reviewed this tool' });
    }

    const review = new Review({
      toolId,
      userId: req.user?.userId,
      userName,
      userEmail,
      userPhoto,
      rating,
      comment
    });

    await review.save({ session });

    const stats = await Review.aggregate([
      { $match: { toolId: new mongoose.Types.ObjectId(toolId) } },
      { $group: { _id: '$toolId', avgRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
    ]);

    if (stats.length > 0) {
      await Tool.findByIdAndUpdate(toolId, {
        avgRating: stats[0].avgRating,
        totalReviews: stats[0].totalReviews
      }, { session });
    }

    await session.commitTransaction();
    res.status(201).json(review);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Server error', error });
  } finally {
    session.endSession();
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user?.userId && req.user?.role !== 'admin') {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Not authorized' });
    }

    const toolId = review.toolId;
    await Review.findByIdAndDelete(req.params.id, { session });

    const stats = await Review.aggregate([
      { $match: { toolId: new mongoose.Types.ObjectId(toolId) } },
      { $group: { _id: '$toolId', avgRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
    ]);

    await Tool.findByIdAndUpdate(toolId, {
      avgRating: stats.length > 0 ? stats[0].avgRating : 0,
      totalReviews: stats.length > 0 ? stats[0].totalReviews : 0
    }, { session });

    await session.commitTransaction();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Server error', error });
  } finally {
    session.endSession();
  }
};
