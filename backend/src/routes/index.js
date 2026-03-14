import { Router } from 'express';
import authRoutes from './auth.routes.js';
import appointmentRoutes from './appointment.routes.js';
import notificationRoutes from './notification.routes.js';
import patientStatusRoutes from './patientStatus.routes.js';
import UserRouter from './user.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', UserRouter);
router.use('/appointments', appointmentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/patient-status', patientStatusRoutes);

export default router;

