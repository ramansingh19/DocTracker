const PatientTracking = require("./patientTracking.model");

// ─── Get own tracking record ──────────────────────────────────────────────────

async function getMyTracking(req, res, next) {
  try {
    const tracking = await PatientTracking.findOne({
      patientId: req.user.id,
    }).populate({
      path: "assignedDoctorId",
      populate: { path: "userId", select: "name email role" },
    });

    return res.json({ tracking });
  } catch (error) {
    return next(error);
  }
}

// ─── Upsert own tracking record (Fix #2) ─────────────────────────────────────

async function upsertMyTracking(req, res, next) {
  try {
    const tracking = await PatientTracking.findOneAndUpdate(
      { patientId: req.user.id },
      { $set: { ...req.validatedBody, patientId: req.user.id } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate({
      path: "assignedDoctorId",
      populate: { path: "userId", select: "name email role" },
    });

    return res.json({ tracking });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMyTracking,
  upsertMyTracking,
};
