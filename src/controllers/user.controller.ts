import { Request, Response } from 'express';
import User from '../models/User';
import Tool from '../models/Tool';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTopContributors = async (req: Request, res: Response) => {
  try {
    const topUsers = await Tool.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$submittedBy', toolsCount: { $sum: 1 } } },
      { $sort: { toolsCount: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 1, toolsCount: 1, name: '$user.name', photoURL: '$user.photoURL' } }
    ]);
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const proUsers = await User.countDocuments({ isPro: true });
    res.json({ totalUsers, proUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
