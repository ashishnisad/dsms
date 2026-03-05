const response = (res, statusCode = 200, success = true, message = '', data = null) => {
  const response = {
    success,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const successResponse = (res, message = '', data = null) => {
  return response(res, 200, true, message, data);
};

const createdResponse = (res, message = '', data = null) => {
  return response(res, 201, true, message, data);
};

const errorResponse = (res, message = '', statusCode = 500) => {
  return response(res, statusCode, false, message, null);
};

const validationError = (res, message = 'Validation failed') => {
  return response(res, 400, false, message, null);
};

const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return response(res, 401, false, message, null);
};

const forbiddenResponse = (res, message = 'Forbidden') => {
  return response(res, 403, false, message, null);
};

const notFoundResponse = (res, message = 'Not found') => {
  return response(res, 404, false, message, null);
};

module.exports = {
  response,
  successResponse,
  createdResponse,
  errorResponse,
  validationError,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse
};
