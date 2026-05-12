const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const corsMiddleware = require("./config/cors");
const apiRouter = require("./modules/routes");
const notFound = require("./shared/middleware/notFound");
const errorHandler = require("./shared/middleware/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
  })
);

app.use("/api", apiRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
