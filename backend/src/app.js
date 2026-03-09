import express from "express";
import morgan from "morgan";

import corsMiddleware from "./config/cors.js";
import helmetMiddleware from "./config/helmet.js";

import { configureRateLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";

import routes from "./routes/index.js";

const app = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(configureRateLimiter());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;