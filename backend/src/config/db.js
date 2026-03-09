import mongoose from "mongoose";
import { databaseConfig } from "./env.js";

export async function connectToDatabase() {
  try {
    await mongoose.connect(databaseConfig.url);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}