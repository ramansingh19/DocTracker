import mongoose from "mongoose";

const queueEntrySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "in_consult", "done", "cancelled"],
      default: "waiting",
    },
    checkedInAt: {
      type: Date,
      default: Date.now,
    },
    estimatedCallTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("QueueEntry", queueEntrySchema);