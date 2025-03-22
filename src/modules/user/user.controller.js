import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import {
  createUser,
  findAndDeleteUser,
  findCustomer,
  findUsers,
} from './user.service.js';

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

const getCustomer = asyncTryCatch(async (req, res) => {
  const user = await findCustomer(req.query);

  res.status(200).json({
    success: true,
    message: 'Customer fetched successfully',
    data: user,
  });
});

const getUsers = asyncTryCatch(async (req, res) => {
  const users = await findUsers();
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

const deleteUser = asyncTryCatch(async (req, res) => {
  const deletedCount = await findAndDeleteUser(req.params);

  res.status(200).json({
    success: true,
    message: `User deleted successfully. Deleted count: ${deletedCount}`,
  });
});

export { deleteUser, getCustomer, getUsers, handleCreateUser };
