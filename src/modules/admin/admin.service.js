import User from '../user/user.model.js';

const findAdmin = async (payload) => {
  const user = await User.isExists(payload?.email);

  if (!user) {
    throw new Error('User not found');
  }

  const isAdmin = user?.role === 'admin';
  return isAdmin;
};

export { findAdmin };
