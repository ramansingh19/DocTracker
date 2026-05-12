import mongoose from "mongoose";

import {
  doctorStatusValues,
  DOCTOR_STATUS,
} from "../../shared/constants/doctorStatus.js";

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: doctorStatusValues,
      default: DOCTOR_STATUS.IN_TRANSIT,
    },

    currentEtaMinutes: {
      type: Number,
      default: null,
    },

    waitingPatients: {
      type: Number,
      default: 0,
    },

    nextSlot: {
      type: String,
      default: null,
    },

    location: {
      lat: {
        type: Number,
        default: null,
      },

      lng: {
        type: Number,
        default: null,
      },

      updatedAt: {
        type: Date,
        default: null,
      },
    },

    isTrackingEnabled: {
      type: Boolean,
      default: false,
    },

    tokenCounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const DoctorProfile = mongoose.model(
  "DoctorProfile",
  doctorProfileSchema
);

export default DoctorProfile;