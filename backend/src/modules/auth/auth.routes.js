const express = require("express");
const rateLimit = require("express-rate-limit");
const validate = require("../../shared/middleware/validate");
const { requireAuth } = require("../../shared/middleware/authMiddleware");
const { login, register, refresh, logout } = require("./auth.controller");
const { loginSchema, registerSchema, refreshTokenSchema } = require("./auth.validation");

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

authRouter.post("/register", authLimiter, validate(registerSchema), register);
authRouter.post("/login", authLimiter, validate(loginSchema), login);
authRouter.post("/refresh", validate(refreshTokenSchema), refresh);
authRouter.post("/logout", requireAuth, validate(refreshTokenSchema), logout);

module.exports = authRouter;
