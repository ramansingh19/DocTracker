import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { appConfig } from '../config/env.js';

function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    appConfig.jwt.secret,
    { expiresIn: appConfig.jwt.expiry }
  );
}

export async function registerUser(payload) {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw ApiError.badRequest('Email already registered');
  }

  const user = await User.create(payload);
  const token = generateToken(user);

  return { user, token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken(user);

  return { user, token };
}

