export const globalError = (error, req, res, next) => {
  // let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  let errorSource = [
    {
      path: req.originalUrl,
      message: message,
      // stack: error.stack.split('\n').slice(3).join('\n')
    },
  ];

  if (error) {
    res.status(500).json({
      message,
      source: errorSource,
      error,
    });
  }
};
