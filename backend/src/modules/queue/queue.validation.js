const { z } = require("zod");

const checkInSchema = z.object({
  doctorId: z.string().min(1),
  patientId: z.string().min(1).optional(),
});

const updateQueueStatusSchema = z.object({
  status: z.enum(["waiting", "in_consult", "done", "cancelled"]),
});

module.exports = {
  checkInSchema,
  updateQueueStatusSchema,
};
