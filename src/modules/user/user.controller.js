import { createUser } from './user.service.js';

const handleCreateUser = async (req, res, next) => {
  try {
    const { user, isNew } = await createUser(req.body);

    res.status(200).json({
      success: true,
      message: isNew
        ? 'User created successfully'
        : 'User already exists. Logging in...',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { handleCreateUser };
