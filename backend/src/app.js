import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers.js';
import { configureRateLimiter } from './middleware/rateLimiter.js';
import routes from './routes/index.js';
import locationRoutes from './routes/locationRoutes.js';  // FIXED IMPORT

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));

// CORS Configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

// CORS middleware must be BEFORE routes
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin.includes('localhost')) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Preflight

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logger
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Rate Limiter
app.use(configureRateLimiter());

// HEALTH route
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// LOCATION ROUTES — NOW WORKS
app.use("/api/location", locationRoutes);

// MAIN API
app.use("/api", routes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
