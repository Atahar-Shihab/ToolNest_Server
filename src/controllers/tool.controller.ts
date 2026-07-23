import { Request, Response } from 'express';
import Tool from '../models/Tool';
import mongoose from 'mongoose';

export const getTools = async (req: Request, res: Response) => {
  try {
    const { search, category, pricing, sort, page = '1', limit = '10' } = req.query;
    const query: any = { status: 'approved' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') query.category = category;
    if (pricing && pricing !== 'All') query.pricing = pricing;

    let sortObj: any = { createdAt: -1 };
    if (sort === 'rating') sortObj = { avgRating: -1 };
    else if (sort === 'bookmarks') sortObj = { bookmarkCount: -1 };
    else if (sort === 'az') sortObj = { title: 1 };
    else if (sort === 'newest') sortObj = { createdAt: -1 };

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const tools = await Tool.find(query).sort(sortObj).skip(skip).limit(limitNum).populate('submittedBy', 'name photoURL');
    const total = await Tool.countDocuments(query);

    res.json({ tools, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getFeaturedTools = async (req: Request, res: Response) => {
  try {
    const tools = await Tool.find({ isFeatured: true, status: 'approved' }).limit(6).populate('submittedBy', 'name photoURL');
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyTools = async (req: Request, res: Response) => {
  try {
    const tools = await Tool.find({ submittedBy: req.user?.userId });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getToolById = async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('submittedBy', 'name photoURL');
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createTool = async (req: Request, res: Response) => {
  try {
    const newTool = new Tool({
      ...req.body,
      submittedBy: req.user?.userId
    });
    await newTool.save();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateTool = async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    
    if (tool.submittedBy.toString() !== req.user?.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this tool' });
    }
    
    const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteTool = async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });

    if (tool.submittedBy.toString() !== req.user?.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this tool' });
    }

    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tool removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateToolStatus = async (req: Request, res: Response) => {
  try {
    const { status, rejectionFeedback } = req.body;
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { status, rejectionFeedback },
      { new: true }
    );
    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const toggleFeatureTool = async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });
    
    tool.isFeatured = !tool.isFeatured;
    await tool.save();
    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const categoryStats = await Tool.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$category', count: { $sum: 1 }, avgRating: { $avg: '$avgRating' } } }
    ]);
    
    const totalTools = await Tool.countDocuments();
    const totalApproved = await Tool.countDocuments({ status: 'approved' });
    const totalPending = await Tool.countDocuments({ status: 'pending' });

    res.json({ categoryStats, totalTools, totalApproved, totalPending });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
