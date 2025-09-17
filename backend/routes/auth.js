const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('role').isIn(['doctor', 'admin'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, role } = req.body;
  if (await User.findByEmail(email)) return res.status(400).json({ error: 'Email already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.createUser({ email, passwordHash, role });
  res.status(201).json({ id: user.id, email: user.email, role: user.role });
});

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// Forgot password endpoint (placeholder implementation)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  // In a real implementation, you would:
  // 1. Check if email exists
  // 2. Generate reset token
  // 3. Send email with reset link
  res.json({ message: 'If this email exists, a reset link has been sent.' });
});

module.exports = router; 