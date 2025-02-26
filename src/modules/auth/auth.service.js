import AppError from '../../error/AppError.js';
import { signToken } from '../../utils/signToken.js';

const generateAuth = async (payload) => {
  const token = signToken(payload);

  if (!token) {
    throw new AppError(500, 'Error generating token!');
  }

  return token;
};

export { generateAuth };
