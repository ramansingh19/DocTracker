import Notification from '../models/Notification.js';

export async function createNotification(payload) {
  return Notification.create(payload);
}

export async function listNotifications(filter = {}) {
  const query = {};

  if (filter.recipient) {
    query.recipient = filter.recipient;
  }

  if (filter.channel) {
    query.channel = filter.channel;
  }

  return Notification.find(query)
    .populate('recipient', 'name email role')
    .sort({ createdAt: -1 });
}

export async function markNotificationAsRead(id) {
  return Notification.findByIdAndUpdate(
    id,
    { readAt: new Date() },
    { new: true, runValidators: true }
  );
}

