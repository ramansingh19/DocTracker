import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: ['in_app', 'email', 'sms'],
      default: 'in_app',
    },
    readAt: Date,
    meta: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

