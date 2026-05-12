import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import corsMiddleware from "./config/cors.js";
import apiRouter from "./modules/routes.js";
import notFound from "./shared/middleware/notFound.js";
import errorHandler from "./shared/middleware/errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: "Too many requests, please try again later.",
    },
  })
);

app.get("/", (req, res) => {
  res.send("Backend API running");
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

export default app;