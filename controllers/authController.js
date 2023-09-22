import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { comparePasswords, hashPassword } from '../utils/hashPassword.js';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const newUser = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'user registered successfully!' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError('invalid credentials');
  const isPassCorrect = await comparePasswords(
    req.body.password,
    user.password
  );
  if (!isPassCorrect) throw new UnauthorizedError('incorrect password');

  const token = createJWT({ userId: user._id, role: user.role });

  res.json({ token });
};
