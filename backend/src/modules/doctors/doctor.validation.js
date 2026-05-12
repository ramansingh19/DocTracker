const { z } = require("zod");
const { doctorStatusValues } = require("../../shared/constants/doctorStatus");

const createDoctorSchema = z.object({
  userId: z.string().min(1),
  department: z.string().trim().min(2),
  nextSlot: z.string().trim().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(doctorStatusValues),
});

const updateEtaSchema = z.object({
  currentEtaMinutes: z.number().int().min(0),
});

const updateLocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  isTrackingEnabled: z.boolean().optional(),
});

module.exports = {
  createDoctorSchema,
  updateStatusSchema,
  updateEtaSchema,
  updateLocationSchema,
};
