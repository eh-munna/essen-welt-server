import AppError from '../error/AppError.js';

export const validateUserEmail = async (req, res, next) => {
  const user = req?.user;
  console.log(user?.email, req?.query?.email);
  console.log(user?.email === req?.query?.email);

  // User not authenticated or invalid token. Return 401 Unauthorized
  if (!user || !user?.email) {
    throw new AppError(401, 'Unauthorized');
  }

  // Return 403, if email is missing in query parameters or nor matched with the authenticated user
  if (!req?.query?.email || req?.query?.email !== user?.email) {
    throw new AppError(403, 'Invalid email');
  }
  next();
};
