import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { findAdmin } from './admin.service.js';

const getAdmin = asyncTryCatch(async (req, res) => {
  const admin = await findAdmin(req?.user);
  res.status(200).json({
    success: true,
    message: admin ? 'Admin found' : 'User is not an admin',
    data: admin,
  });
});

export { getAdmin };
