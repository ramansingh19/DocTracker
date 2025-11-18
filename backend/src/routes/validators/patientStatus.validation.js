import Joi from 'joi';

export const logPatientStatusSchema = Joi.object({
  body: Joi.object({
    patientName: Joi.string().required(),
    doctor: Joi.string().hex().length(24).required(),
    status: Joi.string()
      .valid('waiting', 'checked_in', 'being_seen', 'completed')
      .required(),
    notes: Joi.string().allow('', null),
  }),
});

export const listPatientStatusSchema = Joi.object({
  query: Joi.object({
    doctor: Joi.string().hex().length(24),
  }),
});

