import AppError from '../error/AppError.js';
import User from '../modules/user/user.model.js';

export const verifyAdmin = async (req, res, next) => {
  try {
    const adminEmail = req?.user?.email;

    const user = await User.isExists(adminEmail);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const isAdmin = user?.role === 'admin';

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: User does not have admin privileges',
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};
