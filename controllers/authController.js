import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  const newUser = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ newUser });
};

export const login = async (req, res) => {
  res.send('login');
};
