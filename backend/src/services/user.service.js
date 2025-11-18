import User from '../models/User.js';
import pick from '../utils/pick.js';

export async function listUsers(filter = {}, options = {}) {
  const query = pick(filter, ['role', 'isActive']);
  const limit = Number(options.limit) || 20;
  const page = Number(options.page) || 1;

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getUserById(id) {
  return User.findById(id);
}

export async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

