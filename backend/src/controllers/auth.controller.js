import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { registerUser, loginUser } from '../services/auth.service.js';

export const register = catchAsync(async (req, res) => {
  const { user, token } = await registerUser(req.body);
  res.status(httpStatus.CREATED).json({ user, token });
});

export const login = catchAsync(async (req, res) => {
  const { user, token } = await loginUser(req.body);
  res.json({ user, token });
});

