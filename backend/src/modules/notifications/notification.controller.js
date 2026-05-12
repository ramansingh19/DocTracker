const Notification = require("./notification.model");

function emitNotification(req, notification) {
  const io = req.app.get("io");
  if (io) {
    io.emit("notification:new", notification);
  }
}

// ─── List my notifications — paginated (Fix #8) ───────────────────────────────

async function listNotifications(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { recipientUserId: req.user.id },
        { roleTarget: req.user.role },
      ],
    };

    const [notifications, total] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments(filter),
    ]);

    return res.json({ notifications, total, page, limit });
  } catch (error) {
    return next(error);
  }
}

// ─── Mark as read ─────────────────────────────────────────────────────────────

async function markRead(req, res, next) {
  try {
    const filter = {
      _id: req.params.id,
      $or: [
        { recipientUserId: req.user.id },
        { roleTarget: req.user.role },
      ],
    };

    const notification = await Notification.findOneAndUpdate(
      filter,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return next({ status: 404, message: "Notification not found" });
    }

    return res.json({ notification });
  } catch (error) {
    return next(error);
  }
}

// ─── Broadcast ────────────────────────────────────────────────────────────────

async function broadcastNotification(req, res, next) {
  try {
    const notification = await Notification.create(req.validatedBody);
    emitNotification(req, notification);
    return res.status(201).json({ notification });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listNotifications,
  markRead,
  broadcastNotification,
};
