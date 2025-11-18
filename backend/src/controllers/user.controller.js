import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { listUsers, getUserById, updateUser, deleteUser } from '../services/user.service.js';

export const getUsers = catchAsync(async (req, res) => {
  const result = await listUsers(req.query, req.query);
  res.json(result);
});

export const getUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  res.json(user);
});

export const updateUserProfile = catchAsync(async (req, res) => {
  const user = await updateUser(req.params.userId, req.body);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  res.json(user);
});

export const removeUser = catchAsync(async (req, res) => {
  const user = await deleteUser(req.params.userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  res.status(httpStatus.NO_CONTENT).send();
});

