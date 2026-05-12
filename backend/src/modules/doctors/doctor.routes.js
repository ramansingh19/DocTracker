import express from "express";

import validate from "../../shared/middleware/validate.js";

import {
  requireAuth,
  requireRole,
} from "../../shared/middleware/authMiddleware.js";

import { ROLES } from "../../shared/constants/roles.js";

import {
  createDoctor,
  getDoctorById,
  listDoctors,
  updateDoctorEta,
  updateDoctorStatus,
  updateDoctorLocation,
} from "./doctor.controller.js";

import {
  createDoctorSchema,
  updateEtaSchema,
  updateStatusSchema,
  updateLocationSchema,
} from "./doctor.validation.js";

const doctorRouter = express.Router();

doctorRouter.use(requireAuth);

doctorRouter.get("/", listDoctors);

doctorRouter.get("/:id", getDoctorById);

doctorRouter.post(
  "/",
  requireRole(ROLES.ADMIN),
  validate(createDoctorSchema),
  createDoctor
);

doctorRouter.patch(
  "/:id/status",
  requireRole(ROLES.ADMIN, ROLES.DOCTOR),
  validate(updateStatusSchema),
  updateDoctorStatus
);

doctorRouter.patch(
  "/:id/eta",
  requireRole(ROLES.ADMIN, ROLES.DOCTOR),
  validate(updateEtaSchema),
  updateDoctorEta
);

doctorRouter.patch(
  "/:id/location",
  requireRole(ROLES.ADMIN, ROLES.DOCTOR),
  validate(updateLocationSchema),
  updateDoctorLocation
);

export default doctorRouter;