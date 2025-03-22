import AppError from '../../error/AppError.js';
import User from './user.model.js';

const createUser = async (payload) => {
  let user = await User.isExists(payload?.email);

  if (!user) {
    user = await User.create(payload);
    return { user, isNew: true };
  }
  return { user, isNew: false };
};

const findCustomer = async (payload) => {
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

const findUsers = async () => {
  const users = await User.find({ role: 'customer' });
  if (!users) {
    throw new AppError(404, 'No users found');
  }
  return users;
};

const findAndDeleteUser = async (payload) => {
  const deleteResult = await User.findByIdAndDelete(payload?.id);
  if (!deleteResult?.deletedCount) {
    throw new AppError(404, 'User not found');
  }
  return deleteResult?.deletedCount;
};

export { createUser, findAndDeleteUser, findCustomer, findUsers };
