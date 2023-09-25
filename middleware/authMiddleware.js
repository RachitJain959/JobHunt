import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');

  // restricting the access to jobRoute. If the cookie is not present or JWT is invalid, access is restricted.
  // If everything is fine, ie user is authenticated, this user obj will be available to all the controllers.
  try {
    const { userId, role } = verifyJWT(token);

    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
