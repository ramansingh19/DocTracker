import dotenv from "dotenv";

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/doctracker",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  clientOrigin:
    process.env.CLIENT_ORIGIN || "http://localhost:5173",
};

const hasStrongJwtSecret =
  typeof env.jwtSecret === "string" &&
  env.jwtSecret.length >= 32 &&
  env.jwtSecret !== "replace-me-in-production";

if (env.nodeEnv === "production" && !hasStrongJwtSecret) {
  throw new Error(
    "Missing or weak JWT_SECRET. Set a strong secret (32+ chars) before starting in production."
  );
}

if (!env.jwtSecret) {
  env.jwtSecret = "dev-only-jwt-secret-change-me";
}

export default env;