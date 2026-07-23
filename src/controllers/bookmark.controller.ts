import { Request, Response } from 'express';
import Bookmark from '../models/Bookmark';
import Tool from '../models/Tool';
import mongoose from 'mongoose';

export const toggleBookmark = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { toolId } = req.body;
    const userId = req.user?.userId;

    const existingBookmark = await Bookmark.findOne({ userId, toolId });

    if (existingBookmark) {
      await Bookmark.findByIdAndDelete(existingBookmark._id, { session });
      await Tool.findByIdAndUpdate(toolId, { $inc: { bookmarkCount: -1 } }, { session });
      await session.commitTransaction();
      return res.json({ message: 'Bookmark removed', isBookmarked: false });
    } else {
      const newBookmark = new Bookmark({ userId, toolId });
      await newBookmark.save({ session });
      await Tool.findByIdAndUpdate(toolId, { $inc: { bookmarkCount: 1 } }, { session });
      await session.commitTransaction();
      return res.json({ message: 'Bookmark added', isBookmarked: true });
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Server error', error });
  } finally {
    session.endSession();
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user?.userId }).populate('toolId');
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const checkBookmark = async (req: Request, res: Response) => {
  try {
    const { toolId } = req.params;
    const bookmark = await Bookmark.findOne({ userId: req.user?.userId, toolId });
    res.json({ isBookmarked: !!bookmark });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
