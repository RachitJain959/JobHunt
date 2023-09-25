import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import Job from '../models/jobModel.js';

export const getCurrentUser = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get current user' });
};

export const getApplicationStats = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'application stats' });
};

export const updateUser = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
