import User from './user.model.js';

const createUser = async (payload) => {
  let user = await User.isExists(payload?.email);

  if (!user) {
    user = await User.create(payload);
    return { user, isNew: true };
  }
  return { user, isNew: false };
};

export { createUser };
