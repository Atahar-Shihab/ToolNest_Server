import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId: string, email: string, role: string) => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, photoURL } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      photoURL: photoURL || 'https://via.placeholder.com/150',
      authProvider: 'local'
    });

    await user.save();
    const token = generateToken(user._id.toString(), user.email, user.role);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.authProvider !== 'local') return res.status(400).json({ message: 'Please login using Google' });

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id.toString(), user.email, user.role);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ message: 'Invalid Google token' });

    const { email, name, picture } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        photoURL: picture,
        authProvider: 'google',
        role: 'user'
      });
      await user.save();
    }

    const token = generateToken(user._id.toString(), user.email, user.role);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
