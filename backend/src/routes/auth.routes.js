import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginSchema, registerSchema } from './validators/auth.validation.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;

