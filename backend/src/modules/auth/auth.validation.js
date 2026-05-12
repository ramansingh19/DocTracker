const { z } = require("zod");
const { ROLES } = require("../../shared/constants/roles");

const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(8),
  role: z.enum([ROLES.DOCTOR, ROLES.PATIENT]).optional(),
  phone: z.string().trim().min(7).optional(),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

const refreshTokenSchema = z.object({
  token: z.string().min(1).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
};
