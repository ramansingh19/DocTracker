const express = require("express");
const { listUsers, deleteUser } = require("./users.controller");
const {
  requireAuth,
  requireRole,
} = require("../../shared/middleware/authMiddleware");
const { ROLES } = require("../../shared/constants/roles");

const usersRouter = express.Router();

usersRouter.use(requireAuth, requireRole(ROLES.ADMIN));
usersRouter.get("/", listUsers);
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
