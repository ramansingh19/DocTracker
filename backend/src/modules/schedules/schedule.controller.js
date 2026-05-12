const Schedule = require("./schedule.model");

// ─── List — paginated ─────────────────────────────────────────────────────────

async function listSchedules(req, res, next) {
  try {
    const { doctorId, date } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const query = {};
    if (doctorId) query.doctorId = doctorId;
    if (date) query.date = date;

    const [schedules, total] = await Promise.all([
      Schedule.find(query)
        .populate({
          path: "doctorId",
          populate: { path: "userId", select: "name email role" },
        })
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit),
      Schedule.countDocuments(query),
    ]);

    return res.json({ schedules, total, page, limit });
  } catch (error) {
    return next(error);
  }
}

// ─── Create ───────────────────────────────────────────────────────────────────

async function createSchedule(req, res, next) {
  try {
    const schedule = await Schedule.create(req.validatedBody);
    return res.status(201).json({ schedule });
  } catch (error) {
    return next(error);
  }
}

// ─── Update ───────────────────────────────────────────────────────────────────

async function updateSchedule(req, res, next) {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.validatedBody,
      { new: true }
    );

    if (!schedule) {
      return next({ status: 404, message: "Schedule not found" });
    }

    return res.json({ schedule });
  } catch (error) {
    return next(error);
  }
}

// ─── Book a slot (Fix #4 — overbooking protection) ───────────────────────────

async function bookSlot(req, res, next) {
  try {
    const { slotIndex } = req.validatedBody;

    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return next({ status: 404, message: "Schedule not found" });
    }

    if (schedule.isCancelled) {
      return next({ status: 400, message: "Schedule is cancelled" });
    }

    const slot = schedule.slots[slotIndex];
    if (!slot) {
      return next({ status: 404, message: `Slot at index ${slotIndex} not found` });
    }

    if (slot.booked >= slot.capacity) {
      return next({ status: 409, message: "Slot is fully booked" });
    }

    // Use a conditional update to atomically book the slot.
    // The condition `slots.N.booked < capacity` prevents overbooking
    // even under concurrent requests — if the check above raced, this
    // update will simply return null and we return 409.
    const updated = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id,
        [`slots.${slotIndex}.booked`]: { $lt: slot.capacity },
      },
      { $inc: { [`slots.${slotIndex}.booked`]: 1 } },
      { new: true }
    );

    if (!updated) {
      return next({
        status: 409,
        message: "Slot is fully booked (concurrent request)",
      });
    }

    return res.json({ schedule: updated });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listSchedules,
  createSchedule,
  updateSchedule,
  bookSlot,
};
