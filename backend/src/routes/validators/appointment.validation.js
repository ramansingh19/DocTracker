import Joi from 'joi';

const appointmentIdParams = Joi.object({
  appointmentId: Joi.string().hex().length(24).required(),
});

export const createAppointmentSchema = Joi.object({
  body: Joi.object({
    patientName: Joi.string().min(2).max(120).required(),
    scheduledAt: Joi.date().iso().required(),
    status: Joi.string()
      .valid('scheduled', 'checked_in', 'in_progress', 'completed', 'cancelled')
      .default('scheduled'),
    notes: Joi.string().allow('', null),
  }),
});

export const listAppointmentsSchema = Joi.object({
  query: Joi.object({
    doctor: Joi.string().hex().length(24),
    status: Joi.string().valid(
      'scheduled',
      'checked_in',
      'in_progress',
      'completed',
      'cancelled'
    ),
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
  }),
});

export const updateAppointmentSchema = Joi.object({
  params: appointmentIdParams,
  body: Joi.object({
    scheduledAt: Joi.date().iso(),
    status: Joi.string().valid(
      'scheduled',
      'checked_in',
      'in_progress',
      'completed',
      'cancelled'
    ),
    notes: Joi.string().allow('', null),
  }).min(1),
});

export const appointmentIdSchema = Joi.object({
  params: appointmentIdParams,
});

