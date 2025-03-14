export const verifyUser = async (req, res, next) => {
  const user = req?.user;

  // User not authenticated or invalid token. Return 401 Unauthorized
  if (!user || !user?.email) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  // Handled both cases wether query or params
  const requestedEmail = req?.query?.email || req?.params?.email;

  // Return 403, if email is missing in query parameters or nor matched with the authenticated user
  if (!requestedEmail || requestedEmail !== user?.email) {
    return res.status(403).json({
      success: false,
      message: 'Invalid email',
    });
  }
  next();
};
