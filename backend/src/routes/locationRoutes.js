import express from "express";
import { updateLocation } from "../controllers/locationController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/update", authMiddleware, updateLocation);

export default router;
