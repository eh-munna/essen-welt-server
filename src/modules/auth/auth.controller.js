import { asyncTryCatch } from '../../utils/asyncTryCatch.js';
import { generateAuth } from './auth.service.js';

const authLogin = asyncTryCatch(async (req, res) => {
  const token = await generateAuth(req.body);

  const cookieOptions = {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  };

  res.cookie('access_token', token, cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: token,
  });
});

const authLogout = asyncTryCatch(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  };

  res.clearCookie('access_token', cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
export { authLogin, authLogout };
