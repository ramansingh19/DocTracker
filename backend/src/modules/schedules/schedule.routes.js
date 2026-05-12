import express from "express";
import validate from "../../shared/middleware/validate.js";
import {
  requireAuth,
  requireRole,
} from "../../shared/middleware/authMiddleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import {
  createSchedule,
  listSchedules,
  updateSchedule,
  bookSlot,
} from "./schedule.controller.js";
import {
  createScheduleSchema,
  updateScheduleSchema,
  bookSlotSchema,
} from "./schedule.validation.js";

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

scheduleRouter.post("/:id/book", validate(bookSlotSchema), bookSlot);

export default scheduleRouter;