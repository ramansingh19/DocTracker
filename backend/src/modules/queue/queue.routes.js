import express from "express";
import validate from "../../shared/middleware/validate.js";
import {
  requireAuth,
  requireRole,
} from "../../shared/middleware/authMiddleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import {
  checkInPatient,
  getDoctorQueue,
  getPatientPosition,
  updateQueueStatus,
} from "./queue.controller.js";
import {
  checkInSchema,
  updateQueueStatusSchema,
} from "./queue.validation.js";

const queueRouter = express.Router();

queueRouter.use(requireAuth);

queueRouter.get("/:doctorId", getDoctorQueue);

queueRouter.get("/:doctorId/position/:patientId", getPatientPosition);

queueRouter.post(
  "/checkin",
  requireRole(ROLES.ADMIN, ROLES.PATIENT),
  validate(checkInSchema),
  checkInPatient
);

queueRouter.patch(
  "/:id/status",
  requireRole(ROLES.ADMIN, ROLES.DOCTOR),
  validate(updateQueueStatusSchema),
  updateQueueStatus
);

export default queueRouter;