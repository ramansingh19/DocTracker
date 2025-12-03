import express from "express";
import { updateLocation } from "../controllers/locationcontroller.js";
import { authenticate } from "../middleware/auth.js";


const router = express.Router();

router.post("/update", authenticate, updateLocation);

export default router;
