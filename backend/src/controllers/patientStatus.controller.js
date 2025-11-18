import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import {
  logPatientStatus,
  listPatientStatus,
} from '../services/patientStatus.service.js';

export const logStatus = catchAsync(async (req, res) => {
  const entry = await logPatientStatus({
    ...req.body,
    updatedBy: req.user.id,
  });
  res.status(httpStatus.CREATED).json(entry);
});

export const listStatus = catchAsync(async (req, res) => {
  const entries = await listPatientStatus(req.query.doctor || req.user?.id);
  res.json(entries);
});

