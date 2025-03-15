import User from '../user/user.model.js';

const findAdmin = async (payload) => {
  console.log(payload);
  const user = await User.isExists(payload?.email);

  if (!user) {
    throw new Error('User not found');
  }

  const isAdmin = user?.role === 'admin';
  return isAdmin;
};

export { findAdmin };
