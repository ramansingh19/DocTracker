function sanitizeUser(userDoc) {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;

  return {
    id: user._id?.toString() || user.id,
    _id: user._id?.toString() || user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || null,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export default sanitizeUser;