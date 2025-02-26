import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const signToken = (payload) => {
  const secret = config.secretKey;
  const options = { expiresIn: 60 * 60 };
  const token = jwt.sign(payload, secret, options);
  return token;
};
