const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const RefreshToken = require("./refreshToken.model");
const sanitizeUser = require("../../shared/utils/sanitizeUser");
const { signAccessToken } = require("../../shared/utils/jwt");
const { ROLES } = require("../../shared/constants/roles");
const env = require("../../config/env");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hashToken(plainToken) {
  return crypto.createHash("sha256").update(plainToken).digest("hex");
}

const REFRESH_TOKEN_EXPIRES_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const REFRESH_COOKIE_NAME = "refreshToken";

function setRefreshTokenCookie(res, refreshToken) {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    maxAge: REFRESH_TOKEN_EXPIRES_MS,
    path: "/api/auth",
  });
}

function clearRefreshTokenCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    path: "/api/auth",
  });
}

async function issueTokenPair(user) {
  const accessToken = signAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const plainRefreshToken = crypto.randomBytes(40).toString("hex");
  const tokenHash = hashToken(plainRefreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS);

  await RefreshToken.create({ userId: user._id, tokenHash, expiresAt });

  return { accessToken, refreshToken: plainRefreshToken };
}

function getRefreshTokenFromRequest(req) {
  return req.cookies?.[REFRESH_COOKIE_NAME] || req.validatedBody?.token || null;
}

// ─── Controllers ──────────────────────────────────────────────────────────────

async function register(req, res, next) {
  try {
    const { name, email, password, role, phone } = req.validatedBody;
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return next({ status: 409, message: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || ROLES.PATIENT,
      phone: phone || null,
    });

    const { accessToken, refreshToken } = await issueTokenPair(user);
    setRefreshTokenCookie(res, refreshToken);

    // Return `token` for backward compat + `accessToken`
    return res.status(201).json({
      user: sanitizeUser(user),
      token: accessToken,
      accessToken,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Auth register failed", {
      email: req?.validatedBody?.email,
      role: req?.validatedBody?.role,
      message: error?.message,
    });
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.validatedBody;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.isActive) {
      return next({ status: 401, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return next({ status: 401, message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await issueTokenPair(user);
    setRefreshTokenCookie(res, refreshToken);

    // Return `token` for backward compat + `accessToken`
    return res.json({
      user: sanitizeUser(user),
      token: accessToken,
      accessToken,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Auth login failed", {
      email: req?.validatedBody?.email,
      message: error?.message,
    });
    return next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const token = getRefreshTokenFromRequest(req);
    if (!token) {
      return next({ status: 401, message: "Missing refresh token" });
    }

    const tokenHash = hashToken(token);

    const stored = await RefreshToken.findOne({
      tokenHash,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!stored) {
      return next({ status: 401, message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(stored.userId);
    if (!user || !user.isActive) {
      return next({ status: 401, message: "User not found or inactive" });
    }

    await RefreshToken.findByIdAndUpdate(stored._id, { revoked: true });
    const { accessToken, refreshToken } = await issueTokenPair(user);
    setRefreshTokenCookie(res, refreshToken);

    return res.json({ accessToken, token: accessToken });
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  try {
    const token = getRefreshTokenFromRequest(req);
    if (token) {
      const tokenHash = hashToken(token);
      await RefreshToken.findOneAndUpdate({ tokenHash }, { revoked: true });
    }

    clearRefreshTokenCookie(res);

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
};
