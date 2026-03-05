const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data }),
  };
  res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    message,
    ...(error && { error }),
  };
  res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };