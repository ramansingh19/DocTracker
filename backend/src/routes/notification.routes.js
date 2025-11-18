import { Router } from 'express';
import {
  create,
  list,
  markAsRead,
} from '../controllers/notification.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createNotificationSchema,
  listNotificationSchema,
  notificationIdSchema,
} from './validators/notification.validation.js';

const router = Router();

router.use(authenticate);

router
  .route('/')
  .post(authorize('admin'), validateRequest(createNotificationSchema), create)
  .get(validateRequest(listNotificationSchema), list);

router.patch(
  '/:notificationId/read',
  validateRequest(notificationIdSchema),
  markAsRead
);

export default router;

