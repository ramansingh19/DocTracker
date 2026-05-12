const { z } = require("zod");

const slotSchema = z.object({
  start: z.string().trim().min(1),
  end: z.string().trim().min(1),
  capacity: z.number().int().min(1).default(1),
  booked: z.number().int().min(0).default(0),
});

const createScheduleSchema = z.object({
  doctorId: z.string().min(1),
  date: z.string().min(1),
  slots: z.array(slotSchema).optional(),
  notes: z.string().trim().optional(),
});

const updateScheduleSchema = z.object({
  slots: z.array(slotSchema).optional(),
  isCancelled: z.boolean().optional(),
  notes: z.string().trim().nullable().optional(),
});

const bookSlotSchema = z.object({
  slotIndex: z.number().int().min(0),
});

module.exports = {
  createScheduleSchema,
  updateScheduleSchema,
  bookSlotSchema,
};
