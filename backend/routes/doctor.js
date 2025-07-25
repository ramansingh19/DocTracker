const express = require('express');
const Doctor = require('../models/doctor');
const { getETAFromGoogleMaps } = require('../utils/maps');
const router = express.Router();

const HOSPITAL_ADDRESS = process.env.HOSPITAL_ADDRESS || 'Your Hospital Address Here';

// JWT auth middleware (reuse from user.js)
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    req.user = require('jsonwebtoken').verify(auth.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Update location and calculate ETA
router.post('/doctor/update-location', authMiddleware, async (req, res) => {
  const { lat, lng } = req.body;
  const doctorId = req.user.id;
  await Doctor.saveLocation(doctorId, lat, lng);
  let eta = 'N/A';
  if (lat && lng) {
    eta = await getETAFromGoogleMaps(lat, lng, HOSPITAL_ADDRESS);
    await Doctor.updateETA(doctorId, eta);
  }
  res.json({ success: true, eta });
});

// Update status
router.post('/doctor/update-status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const doctorId = req.user.id;
  await Doctor.updateStatus(doctorId, status);
  res.json({ success: true });
});

// Toggle location sharing
router.post('/doctor/location-sharing', authMiddleware, async (req, res) => {
  const { enabled } = req.body;
  const doctorId = req.user.id;
  await Doctor.setLocationSharing(doctorId, enabled);
  res.json({ success: true });
});

// Get doctor status/ETA
router.get('/doctor/status', authMiddleware, async (req, res) => {
  const doctorId = req.user.id;
  const doctor = await Doctor.getDoctor(doctorId);
  res.json({
    status: doctor.status,
    eta: doctor.last_eta,
    location_sharing_enabled: doctor.location_sharing_enabled,
    last_lat: doctor.last_lat,
    last_lng: doctor.last_lng
  });
});

module.exports = router; 