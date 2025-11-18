import http from 'http';
import app from './app.js';
import { connectToDatabase } from './config/db.js';
import logger from './utils/logger.js';

const port = process.env.PORT || 5000;

const server = http.createServer(app);

async function start() {
  try {
    await connectToDatabase();
    server.listen(port, () => {
      logger.info(`🚀 Server listening on port ${port}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server', { error });
    process.exit(1);
  }
}

start();

