import express from "express";
import rateLimit from "express-rate-limit";

import validate from "../../shared/middleware/validate.js";
import { requireAuth } from "../../shared/middleware/authMiddleware.js";

import {
  login,
  register,
  refresh,
  logout,
} from "./auth.controller.js";

import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from "./auth.validation.js";

const authRouter = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many authentication attempts. Please wait 15 minutes and try again.",
  },
});

authRouter.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);

authRouter.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);

authRouter.post(
  "/refresh",
  validate(refreshTokenSchema),
  refresh
);

authRouter.post(
  "/logout",
  requireAuth,
  validate(refreshTokenSchema),
  logout
);

export default authRouter;