import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'checked_in', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    notes: String,
  },
  { timestamps: true }
);

appointmentSchema.index({ doctor: 1, scheduledAt: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;

