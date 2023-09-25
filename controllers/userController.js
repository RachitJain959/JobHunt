import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import Job from '../models/jobModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPass = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPass });
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);

  res.status(StatusCodes.OK).json({ msg: 'update user' });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'application stats' });
};
