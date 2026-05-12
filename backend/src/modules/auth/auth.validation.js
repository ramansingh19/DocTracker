import { z } from "zod";

import { ROLES } from "../../shared/constants/roles.js";

export const registerSchema = z.object({
  name: z.string().trim().min(2),

  email: z.string().trim().email(),

  password: z.string().min(8),

  role: z
    .enum([ROLES.DOCTOR, ROLES.PATIENT])
    .optional(),

  phone: z.string().trim().min(7).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),

  password: z.string().min(1),
});

export const refreshTokenSchema = z.object({
  token: z.string().min(1).optional(),
});