import User from "../../modules/users/user.model.js";
import { verifyAccessToken } from "../utils/jwt.js";

async function requireAuth(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return next({ status: 401, message: "Missing authentication token" });
    }

    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.userId);

    if (!user || !user.isActive) {
      return next({ status: 401, message: "Invalid authentication token" });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    return next();
  } catch (_error) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

function requireRole(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next({ status: 401, message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next({ status: 403, message: "Forbidden" });
    }

    return next();
  };
}

export {
  requireAuth,
  requireRole,
};