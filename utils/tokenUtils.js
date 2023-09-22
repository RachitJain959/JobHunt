import jwt from 'jsonwebtoken';

// payload can be anything I want it to be. I am sending userID which will give all the info about the user
// we send this token to the frontend which then sends it back with every request in the JWT as a cookie to the server, where it will be decoded.
export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
