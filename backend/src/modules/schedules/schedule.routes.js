const express = require("express");
const validate = require("../../shared/middleware/validate");
const {
  requireAuth,
  requireRole,
} = require("../../shared/middleware/authMiddleware");
const { ROLES } = require("../../shared/constants/roles");
const {
  createSchedule,
  listSchedules,
  updateSchedule,
  bookSlot,
} = require("./schedule.controller");
const {
  createScheduleSchema,
  updateScheduleSchema,
  bookSlotSchema,
} = require("./schedule.validation");

const scheduleRouter = express.Router();

scheduleRouter.use(requireAuth);
scheduleRouter.get("/", listSchedules);
scheduleRouter.post(
  "/",
  requireRole(ROLES.ADMIN),
  validate(createScheduleSchema),
  createSchedule
);
scheduleRouter.patch(
  "/:id",
  requireRole(ROLES.ADMIN),
  validate(updateScheduleSchema),
  updateSchedule
);
scheduleRouter.post(
  "/:id/book",
  validate(bookSlotSchema),
  bookSlot
);

module.exports = scheduleRouter;
