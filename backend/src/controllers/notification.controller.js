import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import {
  createNotification,
  listNotifications,
  markNotificationAsRead,
} from '../services/notification.service.js';
import ApiError from '../utils/ApiError.js';

export const create = catchAsync(async (req, res) => {
  const notification = await createNotification(req.body);
  res.status(httpStatus.CREATED).json(notification);
});

export const list = catchAsync(async (req, res) => {
  const notifications = await listNotifications({ ...req.query, recipient: req.user?.id });
  res.json(notifications);
});

export const markAsRead = catchAsync(async (req, res) => {
  const notification = await markNotificationAsRead(req.params.notificationId);
  if (!notification) {
    throw ApiError.notFound('Notification not found');
  }
  res.json(notification);
});

