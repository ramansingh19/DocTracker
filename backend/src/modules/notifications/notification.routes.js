import express from "express";

import validate from "../../shared/middleware/validate.js";

import {
  requireAuth,
  requireRole,
} from "../../shared/middleware/authMiddleware.js";

import { ROLES } from "../../shared/constants/roles.js";

import {
  broadcastNotification,
  listNotifications,
  markRead,
} from "./notification.controller.js";

import {
  broadcastSchema,
} from "./notification.validation.js";

const notificationRouter = express.Router();

notificationRouter.use(requireAuth);

notificationRouter.get("/", listNotifications);

notificationRouter.patch("/:id/read", markRead);

notificationRouter.post(
  "/broadcast",
  requireRole(ROLES.ADMIN, ROLES.DOCTOR),
  validate(broadcastSchema),
  broadcastNotification
);

export default notificationRouter;