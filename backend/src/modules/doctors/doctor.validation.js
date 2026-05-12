import { z } from "zod";

import {
  doctorStatusValues,
} from "../../shared/constants/doctorStatus.js";

export const createDoctorSchema = z.object({
  userId: z.string().min(1),

  department: z.string().trim().min(2),

  nextSlot: z.string().trim().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(doctorStatusValues),
});

export const updateEtaSchema = z.object({
  currentEtaMinutes: z.number().int().min(0),
});

export const updateLocationSchema = z.object({
  lat: z.number(),

  lng: z.number(),

  isTrackingEnabled: z.boolean().optional(),
});