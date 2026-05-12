import express from "express";
import { listUsers, deleteUser } from "./users.controller.js";
import {
  requireAuth,
  requireRole,
} from "../../shared/middleware/authMiddleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const usersRouter = express.Router();

usersRouter.use(requireAuth, requireRole(ROLES.ADMIN));

usersRouter.get("/", listUsers);

usersRouter.delete("/:id", deleteUser);

export default usersRouter;