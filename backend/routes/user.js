const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, role: user.role });
});

router.post('/me/push-token', authMiddleware, async (req, res) => {
  const { pushToken } = req.body;
  await User.savePushToken(req.user.id, pushToken);
  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  // On frontend, just delete the JWT. Optionally, implement token blacklist.
  res.json({ message: 'Logged out' });
});

module.exports = router; 