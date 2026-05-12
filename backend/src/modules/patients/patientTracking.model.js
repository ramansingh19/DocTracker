import mongoose from "mongoose";

const patientTrackingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    assignedDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      default: null,
    },
    checkInStatus: {
      type: String,
      enum: ["not_checked_in", "checked_in", "in_consultation", "completed"],
      default: "not_checked_in",
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PatientTracking", patientTrackingSchema);