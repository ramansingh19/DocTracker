const express = require("express");
const validate = require("../../shared/middleware/validate");
const {
  requireAuth,
  requireRole,
} = require("../../shared/middleware/authMiddleware");
const { ROLES } = require("../../shared/constants/roles");
const {
  createDoctor,
  getDoctorById,
  listDoctors,
  updateDoctorEta,
  updateDoctorStatus,
  updateDoctorLocation,
} = require("./doctor.controller");
const {
  createDoctorSchema,
  updateEtaSchema,
  updateStatusSchema,
  updateLocationSchema,
} = require("./doctor.validation");

const doctorRouter = express.Router();

doctorRouter.use(requireAuth);
doctorRouter.get("/", listDoctors);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", requireRole(ROLES.ADMIN), validate(createDoctorSchema), createDoctor);
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

module.exports = doctorRouter;
