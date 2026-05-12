const express = require("express");
const validate = require("../../shared/middleware/validate");
const {
  requireAuth,
  requireRole,
} = require("../../shared/middleware/authMiddleware");
const { ROLES } = require("../../shared/constants/roles");
const {
  checkInPatient,
  getDoctorQueue,
  getPatientPosition,
  updateQueueStatus,
} = require("./queue.controller");
const { checkInSchema, updateQueueStatusSchema } = require("./queue.validation");

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

module.exports = queueRouter;
