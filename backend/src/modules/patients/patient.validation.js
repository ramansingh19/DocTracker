const { z } = require("zod");

const upsertTrackingSchema = z.object({
  assignedDoctorId: z.string().nullable().optional(),
  checkInStatus: z
    .enum(["not_checked_in", "checked_in", "in_consultation", "completed"])
    .optional(),
  notes: z.string().trim().nullable().optional(),
});

module.exports = {
  upsertTrackingSchema,
};
