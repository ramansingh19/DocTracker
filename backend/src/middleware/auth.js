import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import { appConfig } from '../config/env.js';
import User from '../models/User.js';

export async function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized());
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, appConfig.jwt.secret);
    const user = await User.findById(payload.sub);
    if (!user) {
      return next(ApiError.unauthorized('User not found'));
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
}

export function authorize(roles = []) {
  const allowed = Array.isArray(roles) ? roles : [roles];

  return (req, _res, next) => {
    if (!allowed.length || allowed.includes(req.user.role)) {
      return next();
    }
    return next(new ApiError(httpStatus.FORBIDDEN, 'Insufficient permissions'));
  };
}

