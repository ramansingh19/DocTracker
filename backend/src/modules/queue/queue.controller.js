import QueueEntry from "./queue.model.js";
import DoctorProfile from "../doctors/doctor.model.js";
import { ROLES } from "../../shared/constants/roles.js";

function emitQueueUpdated(req, payload) {
  const io = req.app.get("io");

  if (io) {
    io.emit("queue:updated", payload);
  }
}

// ─── Get doctor's queue ───────────────────────────────────────────────────────

async function getDoctorQueue(req, res, next) {
  try {
    const { doctorId } = req.params;

    const entries = await QueueEntry.find({
      doctorId,
      status: { $in: ["waiting", "in_consult"] },
    })
      .populate("patientId", "name email")
      .sort({ tokenNumber: 1 });

    return res.json({
      doctorId,
      totalInQueue: entries.length,
      entries,
    });
  } catch (error) {
    return next(error);
  }
}

// ─── Get patient position ─────────────────────────────────────────────────────

async function getPatientPosition(req, res, next) {
  try {
    const { doctorId, patientId } = req.params;

    const waitingEntries = await QueueEntry.find({
      doctorId,
      status: "waiting",
    }).sort({ tokenNumber: 1 });

    const currentIndex = waitingEntries.findIndex(
      (entry) => entry.patientId.toString() === patientId
    );

    return res.json({
      doctorId,
      patientId,
      queuePosition: currentIndex >= 0 ? currentIndex + 1 : null,
      totalInQueue: waitingEntries.length,
    });
  } catch (error) {
    return next(error);
  }
}

// ─── Check in patient (Fix #7 race condition + Fix #1 waitingPatients) ────────

async function checkInPatient(req, res, next) {
  try {
    const { doctorId, patientId: requestedPatientId } = req.validatedBody;

    const patientId =
      req.user.role === ROLES.PATIENT ? req.user.id : requestedPatientId;

    if (!patientId) {
      return next({
        status: 400,
        message: "patientId is required for non-patient check-in",
      });
    }

    // Atomically increment tokenCounter and waitingPatients in one operation
    // This eliminates the race condition that existed with the old find-then-increment pattern
    const updatedDoctor = await DoctorProfile.findByIdAndUpdate(
      doctorId,
      { $inc: { tokenCounter: 1, waitingPatients: 1 } },
      { new: true }
    );

    if (!updatedDoctor) {
      return next({ status: 404, message: "Doctor not found" });
    }

    const tokenNumber = updatedDoctor.tokenCounter;

    const entry = await QueueEntry.create({
      doctorId,
      patientId,
      tokenNumber,
    });

    emitQueueUpdated(req, { doctorId, tokenNumber });

    return res.status(201).json({
      entry,
      message: "Patient checked in successfully",
    });
  } catch (error) {
    return next(error);
  }
}

// ─── Update queue entry status (Fix #3 + Fix #1) ─────────────────────────────

async function updateQueueStatus(req, res, next) {
  try {
    const { status } = req.validatedBody;

    // Fetch current state before update to decide whether to decrement
    const currentEntry = await QueueEntry.findById(req.params.id);

    if (!currentEntry) {
      return next({ status: 404, message: "Queue entry not found" });
    }

    const entry = await QueueEntry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Only decrement waitingPatients if the patient is transitioning
    // OUT of an active state (waiting/in_consult) to a terminal state
    const wasActive =
      currentEntry.status === "waiting" ||
      currentEntry.status === "in_consult";

    const isNowTerminal = status === "done" || status === "cancelled";

    if (wasActive && isNowTerminal) {
      // Use $max via aggregation pipeline update to prevent going below 0
      await DoctorProfile.findByIdAndUpdate(entry.doctorId, [
        {
          $set: {
            waitingPatients: {
              $max: [0, { $subtract: ["$waitingPatients", 1] }],
            },
          },
        },
      ]);
    }

    emitQueueUpdated(req, {
      doctorId: entry.doctorId,
      entryId: entry._id,
      status,
    });

    return res.json({ entry });
  } catch (error) {
    return next(error);
  }
}

export {
  getDoctorQueue,
  getPatientPosition,
  checkInPatient,
  updateQueueStatus,
};