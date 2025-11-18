import Joi from 'joi';

const notificationIdParams = Joi.object({
  notificationId: Joi.string().hex().length(24).required(),
});

export const createNotificationSchema = Joi.object({
  body: Joi.object({
    recipient: Joi.string().hex().length(24).required(),
    title: Joi.string().max(140).required(),
    message: Joi.string().required(),
    channel: Joi.string().valid('in_app', 'email', 'sms').default('in_app'),
    meta: Joi.object().optional(),
  }),
});

export const listNotificationSchema = Joi.object({
  query: Joi.object({
    channel: Joi.string().valid('in_app', 'email', 'sms'),
  }),
});

export const notificationIdSchema = Joi.object({
  params: notificationIdParams,
});

