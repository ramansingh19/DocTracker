import { Router } from "express";
import {
  getUser,
  updateUserProfile,
  removeUser,
  register,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  listUsersSchema,
  updateUserSchema,
  userIdSchema,
} from "./validators/user.validation.js";
import { upload } from "../middleware/multer.js";

const UserRouter = Router();

// Public route
UserRouter.post("/", upload.single("avatar"), register);

// Protected routes (admin only)
UserRouter.use(authenticate, authorize("admin"));

UserRouter.get("/", validateRequest(listUsersSchema));
UserRouter.get("/:userId", validateRequest(userIdSchema), getUser);
UserRouter.patch("/:userId", validateRequest(updateUserSchema), updateUserProfile);
UserRouter.delete("/:userId", validateRequest(userIdSchema), removeUser);

export default UserRouter;