import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');

  // restricting the access to jobRoute. If the cookie is not present or JWT is invalid, access is restricted.
  // If everything is fine, ie user is authenticated, this user obj will be available to all the controllers.
  try {
    const { userId, role } = verifyJWT(token);

    const testUser = userId === '651e7509f9107636ed0864e5';

    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

export const checkTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo User. Read only.');
  next();
};
