import Joi from 'joi';

export const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('doctor', 'patient', 'admin').default('patient'),
    phone: Joi.string().optional(),
    specialty: Joi.when('role', {
      is: 'doctor',
      then: Joi.string().optional(),then: Joi.string().optional(),

      otherwise: Joi.string().optional(),
    }),
  }),
});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

