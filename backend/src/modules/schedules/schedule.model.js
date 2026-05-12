const mongoose = require("mongoose");

const scheduleSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
    capacity: { type: Number, required: true, default: 1 },
    booked: { type: Number, default: 0 },
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    slots: {
      type: [scheduleSlotSchema],
      default: [],
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
