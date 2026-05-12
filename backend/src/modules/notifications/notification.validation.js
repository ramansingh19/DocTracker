import { z } from "zod";

import { ROLES } from "../../shared/constants/roles.js";

const roleValues = Object.values(ROLES);

export const broadcastSchema = z.object({
  type: z.string().trim().min(1),

  title: z.string().trim().min(1),

  message: z.string().trim().min(1),

  roleTarget: z.enum(roleValues).optional(),

  recipientUserId: z.string().optional(),

  meta: z
    .record(z.string(), z.any())
    .optional(),
});