import User from './user.model.js';

const createUser = async (payload) => {
  let user = await User.isExists(payload?.email);

  if (!user) {
    user = await User.create(payload);
    return { user, isNew: true };
  }
  return { user, isNew: false };
};

const findUser = async (payload) => {
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppErrorError(404, 'User not found');
  }
  return user;
};

export { createUser, findUser };
