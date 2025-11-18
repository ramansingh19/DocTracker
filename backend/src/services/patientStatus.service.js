import PatientStatusLog from '../models/PatientStatusLog.js';

export async function logPatientStatus(payload) {
  return PatientStatusLog.create(payload);
}

export async function listPatientStatus(doctorId) {
  const query = doctorId ? { doctor: doctorId } : {};
  return PatientStatusLog.find(query)
    .populate('doctor', 'name email')
    .populate('updatedBy', 'name email')
    .sort({ createdAt: -1 });
}

