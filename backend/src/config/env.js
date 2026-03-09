import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000
};

export const databaseConfig = {
  url: process.env.MONGO_URI
};