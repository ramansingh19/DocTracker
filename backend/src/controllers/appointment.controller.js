import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import {
  createAppointment,
  listAppointments,
  updateAppointment,
  deleteAppointment,
} from '../services/appointment.service.js';

export const create = catchAsync(async (req, res) => {
  const appointment = await createAppointment({ ...req.body, doctor: req.user.id });
  res.status(httpStatus.CREATED).json(appointment);
});

export const list = catchAsync(async (req, res) => {
  const appointments = await listAppointments(req.query, req.query);
  res.json(appointments);
});

export const update = catchAsync(async (req, res) => {
  const appointment = await updateAppointment(req.params.appointmentId, req.body);
  if (!appointment) {
    throw ApiError.notFound('Appointment not found');
  }
  res.json(appointment);
});

export const remove = catchAsync(async (req, res) => {
  const appointment = await deleteAppointment(req.params.appointmentId);
  if (!appointment) {
    throw ApiError.notFound('Appointment not found');
  }
  res.status(httpStatus.NO_CONTENT).send();
});

