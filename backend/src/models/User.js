import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const roles = ['doctor', 'patient', 'admin'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select : false,
    },
    role: {
      type: String,
      enum: roles,
      default: 'patient',
    },
    phone: String,
    specialty: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: Date,

    
  },
  { timestamps: true }

  
);
userSchema.index({ email: 1 });

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
export { roles as userRoles };

