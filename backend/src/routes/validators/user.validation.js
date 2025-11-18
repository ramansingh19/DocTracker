import Joi from 'joi';

const userIdParam = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

export const listUsersSchema = Joi.object({
  query: Joi.object({
    role: Joi.string().valid('doctor', 'patient', 'admin'),
    isActive: Joi.boolean(),
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
  }),
});

export const updateUserSchema = Joi.object({
  params: userIdParam,
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    phone: Joi.string(),
    specialty: Joi.string(),
    isActive: Joi.boolean(),
  }),
});

export const userIdSchema = Joi.object({
  params: userIdParam,
});

