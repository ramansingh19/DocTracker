import jwt from "jsonwebtoken";
import env from "../../config/env.js";

function signAccessToken(payload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

export {
  signAccessToken,
  verifyAccessToken,
};