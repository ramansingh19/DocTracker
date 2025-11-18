import { Router } from 'express';
import {
  create,
  list,
  update,
  remove,
} from '../controllers/appointment.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createAppointmentSchema,
  listAppointmentsSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
} from './validators/appointment.validation.js';

const router = Router();

router.use(authenticate);

router
  .route('/')
  .post(authorize(['doctor', 'admin']), validateRequest(createAppointmentSchema), create)
  .get(validateRequest(listAppointmentsSchema), list);

router
  .route('/:appointmentId')
  .patch(authorize(['doctor', 'admin']), validateRequest(updateAppointmentSchema), update)
  .delete(authorize(['doctor', 'admin']), validateRequest(appointmentIdSchema), remove);

export default router;

