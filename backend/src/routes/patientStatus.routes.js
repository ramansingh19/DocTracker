import { Router } from 'express';
import { logStatus, listStatus } from '../controllers/patientStatus.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  logPatientStatusSchema,
  listPatientStatusSchema,
} from './validators/patientStatus.validation.js';

const router = Router();

router.use(authenticate);

router
  .route('/')
  .post(validateRequest(logPatientStatusSchema), logStatus)
  .get(validateRequest(listPatientStatusSchema), listStatus);

export default router;

