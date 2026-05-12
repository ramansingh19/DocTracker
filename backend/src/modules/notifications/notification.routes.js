const express = require("express");
const validate = require("../../shared/middleware/validate");
const {
  requireAuth,
  requireRole,
} = require("../../shared/middleware/authMiddleware");
const { ROLES } = require("../../shared/constants/roles");
const {
  broadcastNotification,
  listNotifications,
  markRead,
} = require("./notification.controller");
const { broadcastSchema } = require("./notification.validation");

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

module.exports = notificationRouter;
