import mongoose from 'mongoose';

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hash: {
      type: String,
      required: [true, 'Hash is required'],
    },
    roles: {
      type: String,
      default: 'User',
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'auth',
  }
);

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
