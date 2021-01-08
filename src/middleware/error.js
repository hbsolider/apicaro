import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';

export const errorHandler = (err, req, res) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    statusCode: statusCode ?? httpStatus.INTERNAL_SERVER_ERROR,
    message: message ?? httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
  };

  return res.status(statusCode).json(response);
};

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }

  return errorHandler(error, req, res);
};

export const notFoundHandler = (req, res, next) => {
  const err = new ApiError(httpStatus.NOT_FOUND, 'Not found');

  return errorHandler(err, req, res);
};
