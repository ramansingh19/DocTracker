const { z } = require("zod");
const { ROLES } = require("../../shared/constants/roles");

const roleValues = Object.values(ROLES);

const broadcastSchema = z.object({
  type: z.string().trim().min(1),
  title: z.string().trim().min(1),
  message: z.string().trim().min(1),
  roleTarget: z.enum(roleValues).optional(),
  recipientUserId: z.string().optional(),
  meta: z.record(z.string(), z.any()).optional(),
});

module.exports = {
  broadcastSchema,
};
