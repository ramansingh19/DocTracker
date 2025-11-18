import mongoose from 'mongoose';

const patientStatusLogSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['waiting', 'checked_in', 'being_seen', 'completed'],
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    notes: String,
  },
  { timestamps: true }
);

patientStatusLogSchema.index({ doctor: 1, createdAt: -1 });

const PatientStatusLog = mongoose.model('PatientStatusLog', patientStatusLogSchema);

export default PatientStatusLog;

