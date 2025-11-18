import mongoose from 'mongoose';
import { databaseConfig } from './env.js';
import logger from '../utils/logger.js';

mongoose.set('strictQuery', true);

export async function connectToDatabase() {
  const { url, options } = databaseConfig;

  mongoose.connection.on('connected', () => {
    logger.info('✅ MongoDB connected');
  });

  mongoose.connection.on('error', (error) => {
    logger.error('❌ MongoDB connection error', { error });
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('⚠️ MongoDB disconnected');
  });

  // Only pass options if it has properties, otherwise use default MongoDB driver options
  const connectOptions = Object.keys(options).length > 0 ? options : undefined;
  await mongoose.connect(url, connectOptions);
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

