import Appointment from '../models/Appointment.js';

export async function createAppointment(payload) {
  return Appointment.create(payload);
}

export async function listAppointments(filter = {}, options = {}) {
  const limit = Number(options.limit) || 20;
  const page = Number(options.page) || 1;
  const query = {};

  if (filter.doctor) {
    query.doctor = filter.doctor;
  }

  if (filter.status) {
    query.status = filter.status;
  }

  const [total, appointments] = await Promise.all([
    Appointment.countDocuments(query),
    Appointment.find(query)
      .populate('doctor', 'name email specialty')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ scheduledAt: 1 }),
  ]);

  return {
    data: appointments,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function updateAppointment(id, updates) {
  return Appointment.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

export async function deleteAppointment(id) {
  return Appointment.findByIdAndDelete(id);
}

