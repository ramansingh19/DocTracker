const User = require("./user.model");
const sanitizeUser = require("../../shared/utils/sanitizeUser");

// ─── List — paginated (Fix #8) ────────────────────────────────────────────────

async function listUsers(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments({}),
    ]);

    return res.json({
      users: users.map(sanitizeUser),
      total,
      page,
      limit,
    });
  } catch (error) {
    return next(error);
  }
}

// ─── Soft-delete ──────────────────────────────────────────────────────────────

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    return res.json({
      message: "User deactivated",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listUsers,
  deleteUser,
};
