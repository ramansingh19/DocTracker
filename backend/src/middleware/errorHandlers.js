import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';

export function notFoundHandler(_req, _res, next) {
  next(ApiError.notFound('Route not found'));
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    status: 'error',
    message: error.message || 'Internal server error',
  };

  if (error.details) {
    response.details = error.details;
  }

  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    logger.error('Unhandled error', error);
  }

  res.status(statusCode).json(response);
}

