import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { createUser, findUser } from './user.service.js';

const handleCreateUser = asyncTryCatch(async (req, res) => {
  const { user, isNew } = await createUser(req.body);

  res.status(200).json({
    success: true,
    message: isNew
      ? 'User created successfully'
      : 'User already exists. Logging in...',
    data: user,
  });
});

const getUser = asyncTryCatch(async (req, res) => {
  const user = await findUser(req.query);

  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

export { getUser, handleCreateUser };
