import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateUserProfile,
  removeUser,
} from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  listUsersSchema,
  updateUserSchema,
  userIdSchema,
} from './validators/user.validation.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/', validateRequest(listUsersSchema), getUsers);
router.get('/:userId', validateRequest(userIdSchema), getUser);
router.patch('/:userId', validateRequest(updateUserSchema), updateUserProfile);
router.delete('/:userId', validateRequest(userIdSchema), removeUser);

export default router;

