import AppError from '../../error/AppError.js';
import User from '../user/user.model.js';

const findAdmin = async (payload) => {
  const user = await User.isExists(payload?.email);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const isAdmin = user?.role === 'admin';

  return isAdmin;
};

export { findAdmin };
