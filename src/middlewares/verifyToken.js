import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    if (!decoded?.email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
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
