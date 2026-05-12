const DoctorProfile = require("./doctor.model");
const User = require("../users/user.model");
const { ROLES } = require("../../shared/constants/roles");

function emitDoctorUpdated(req, doctor) {
  const io = req.app.get("io");
  if (io) {
    io.emit("doctor:updated", doctor);
  }
}

async function resolveDoctorProfileId(req) {
  if (req.user.role === ROLES.ADMIN) {
    return req.params.id;
  }

  const ownProfile = await DoctorProfile.findOne({ userId: req.user.id }).select(
    "_id"
  );
  return ownProfile?._id || null;
}

// ─── List — paginated ─────────────────────────────────────────────────────────

async function listDoctors(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [doctors, total] = await Promise.all([
      DoctorProfile.find({})
        .populate("userId", "name email role")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      DoctorProfile.countDocuments({}),
    ]);

    return res.json({ doctors, total, page, limit });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

// ─── Get by ID ────────────────────────────────────────────────────────────────

async function getDoctorById(req, res, next) {
  try {
    const doctor = await DoctorProfile.findById(req.params.id).populate(
      "userId",
      "name email role"
    );
    if (!doctor) {
      return next({ status: 404, message: "Doctor not found" });
    }
    return res.json({ doctor });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

// ─── Create ───────────────────────────────────────────────────────────────────

async function createDoctor(req, res, next) {
  try {
    const { userId, department, nextSlot } = req.validatedBody;
    const user = await User.findById(userId);

    if (!user || user.role !== ROLES.DOCTOR) {
      return next({ status: 400, message: "A valid doctor user is required" });
    }

    const existingProfile = await DoctorProfile.findOne({ userId });
    if (existingProfile) {
      return next({ status: 409, message: "Doctor profile already exists" });
    }

    const doctor = await DoctorProfile.create({ userId, department, nextSlot });
    const populatedDoctor = await doctor.populate("userId", "name email role");
    emitDoctorUpdated(req, populatedDoctor);

    return res.status(201).json({ doctor: populatedDoctor });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

// ─── Update status ────────────────────────────────────────────────────────────

async function updateDoctorStatus(req, res, next) {
  try {
    const { status } = req.validatedBody;
    const targetDoctorId = await resolveDoctorProfileId(req);
    if (!targetDoctorId) {
      return next({ status: 404, message: "Doctor profile not found" });
    }

    const doctor = await DoctorProfile.findByIdAndUpdate(
      targetDoctorId,
      { status },
      { new: true }
    ).populate("userId", "name email role");

    if (!doctor) {
      return next({ status: 404, message: "Doctor not found" });
    }

    emitDoctorUpdated(req, doctor);
    return res.json({ doctor });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

// ─── Update ETA ───────────────────────────────────────────────────────────────

async function updateDoctorEta(req, res, next) {
  try {
    const { currentEtaMinutes } = req.validatedBody;
    const targetDoctorId = await resolveDoctorProfileId(req);
    if (!targetDoctorId) {
      return next({ status: 404, message: "Doctor profile not found" });
    }

    const doctor = await DoctorProfile.findByIdAndUpdate(
      targetDoctorId,
      { currentEtaMinutes },
      { new: true }
    ).populate("userId", "name email role");

    if (!doctor) {
      return next({ status: 404, message: "Doctor not found" });
    }

    emitDoctorUpdated(req, doctor);
    return res.json({ doctor });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

// ─── Update location (Fix #5) ─────────────────────────────────────────────────

async function updateDoctorLocation(req, res, next) {
  try {
    const { lat, lng, isTrackingEnabled } = req.validatedBody;
    const targetDoctorId = await resolveDoctorProfileId(req);
    if (!targetDoctorId) {
      return next({ status: 404, message: "Doctor profile not found" });
    }

    const update = {
      $set: {
        "location.lat": lat,
        "location.lng": lng,
        "location.updatedAt": new Date(),
      },
    };

    if (isTrackingEnabled !== undefined) {
      update.$set.isTrackingEnabled = isTrackingEnabled;
    }

    const doctor = await DoctorProfile.findByIdAndUpdate(
      targetDoctorId,
      update,
      { new: true }
    ).populate("userId", "name email role");

    if (!doctor) {
      return next({ status: 404, message: "Doctor not found" });
    }

    emitDoctorUpdated(req, doctor);
    return res.json({ doctor });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = {
  listDoctors,
  getDoctorById,
  createDoctor,
  updateDoctorStatus,
  updateDoctorEta,
  updateDoctorLocation,
};
