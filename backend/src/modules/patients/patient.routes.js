const express = require("express");
const validate = require("../../shared/middleware/validate");
const {
  requireAuth,
  requireRole,
} = require("../../shared/middleware/authMiddleware");
const { ROLES } = require("../../shared/constants/roles");
const { getMyTracking, upsertMyTracking } = require("./patient.controller");
const { upsertTrackingSchema } = require("./patient.validation");

const patientRouter = express.Router();

patientRouter.use(requireAuth);
patientRouter.get("/me/tracking", getMyTracking);
patientRouter.put(
  "/me/tracking",
  requireRole(ROLES.PATIENT, ROLES.ADMIN),
  validate(upsertTrackingSchema),
  upsertMyTracking
);

module.exports = patientRouter;
