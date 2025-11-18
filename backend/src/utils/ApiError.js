import httpStatus from 'http-status';

class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message, details) {
    return new ApiError(httpStatus.BAD_REQUEST, message, details);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(httpStatus.UNAUTHORIZED, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(httpStatus.FORBIDDEN, message);
  }

  static notFound(message = 'Not found') {
    return new ApiError(httpStatus.NOT_FOUND, message);
  }
}

export default ApiError;

