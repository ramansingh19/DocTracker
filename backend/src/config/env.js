import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const appConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET || 'development-secret',
    expiry: process.env.JWT_EXPIRY || '1d',
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
};

export const databaseConfig = {
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/doctracker',
  options: {
    // Removed deprecated options: useNewUrlParser and useUnifiedTopology
    // These are no longer needed in MongoDB Driver 4.0.0+
  },
};

