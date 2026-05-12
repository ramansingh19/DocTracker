import express from "express";
import validate from "../../shared/middleware/validate.js";
import {
  requireAuth,
  requireRole,
} from "../../shared/middleware/authMiddleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { getMyTracking, upsertMyTracking } from "./patient.controller.js";
import { upsertTrackingSchema } from "./patient.validation.js";

const patientRouter = express.Router();

patientRouter.use(requireAuth);

patientRouter.get("/me/tracking", getMyTracking);

patientRouter.put(
  "/me/tracking",
  requireRole(ROLES.PATIENT, ROLES.ADMIN),
  validate(upsertTrackingSchema),
  upsertMyTracking
);

export default patientRouter;